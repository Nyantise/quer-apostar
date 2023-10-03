import {faker} from '@faker-js/faker';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';

import { createNetworkFactory, createUser } from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import { prisma } from '@/config';
import app, { init } from '@/app';
import { Network } from '@prisma/client';
import { NetworkSchema } from '@/schema';

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe('GET /network', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/network');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/network').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/network').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {

    it('should respond with status 204 when there is no network created by the user', async () => {
      const token = await generateValidToken();

      const response = await server.get('/network').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NO_CONTENT);
    });

    it('should respond with status 200 and network list when there are networks created by the user', async () => {
      const user = await createUser();
      const network:Network[] = [
        await createNetworkFactory(user, "password"),
        await createNetworkFactory(user, "password")]
      const token = await generateValidToken(user);

      const response = await server.get('/network').set('Authorization', `Bearer ${token}`);
      
      network[0].password = "password"
      network[1].password = "password"

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(expect.arrayContaining([
        ...network
      ]));
    });
  });
});

describe('GET /network/id', () => {
  describe('when token is valid', () => {
    it('should respond with status 200 and network data for given network Id', async () => {
      const user = await createUser();
      const network = await createNetworkFactory(user, "password");
      const token = await generateValidToken(user);

      const response = await server.get(`/network/${network.id}`).set('Authorization', `Bearer ${token}`);

      network.password = "password"


      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        id: network.id,
        title: network.title,        
        network: network.network,
        password: network.password,
        userId: network.userId,
      }as Network);
    });
  });
});

describe('POST /network', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.post('/network');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.post('/network').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post('/network').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 400 when body is not present', async () => {
      const token = await generateValidToken();

      const response = await server.post('/network').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 400 when body is not valid', async () => {
      const token = await generateValidToken();
      const body = { [faker.lorem.word()]: faker.lorem.word() };

      const response = await server.post('/network').set('Authorization', `Bearer ${token}`).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    describe('when body is valid', () => {
      const generateValidBody = () => ({
        title: faker.company.name(),
        network: faker.internet.url(),
        password: faker.internet.password(10),
      }as NetworkSchema);

      it('should respond with status 201 and create new network if user doesnt already have one with same title', async () => {
        const body = generateValidBody();
        const user = await createUser()
        const token = await generateValidToken(user);

        const response = await server.post('/network').set('Authorization', `Bearer ${token}`).send(body);

        expect(response.status).toBe(httpStatus.OK);
        const network = await prisma.network.findFirst({ where: { title: body.title, userId: user.id} });
        expect(network).toBeDefined();
      });
      
    });
  });
});


describe('DELETE /network/id', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.delete('/network/1');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.delete('/network/1').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.delete('/network/1').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 400 when param is not valid', async () => {
      const token = await generateValidToken();

      const response = await server.delete('/network/a').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    describe('when param is valid', () => {

      it('should respond with status 404 if the network doesnt exists', async () => {
        const tokenFromUser1 = await generateValidToken();

        const response = await server.delete('/network/'+5_000_000)
        .set('Authorization', `Bearer ${tokenFromUser1}`);

        expect(response.status).toBe(httpStatus.NOT_FOUND);
      });

      it('should respond with status 401 if the network wasnt created by the user', async () => {
        const tokenFromUser1 = await generateValidToken();
        const networkFromUser2 = await createNetworkFactory()

        const response = await server.delete('/network/'+networkFromUser2.id)
        .set('Authorization', `Bearer ${tokenFromUser1}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      });

      it('should respond with status 200 and delete if its user network', async () => {
        const user = await createUser()
        const token = await generateValidToken(user);
        const network = await createNetworkFactory(user)

        const response = await server.delete('/network/'+network.id)
        .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.OK);
        const query = await prisma.network.findFirst({ where: { id:network.id } });
        expect(query).toBeNull();
      });
      
    });
  });
});
