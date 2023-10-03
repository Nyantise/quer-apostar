import {faker} from '@faker-js/faker';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';

import { createCredentialFactory, createUser } from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import { prisma } from '@/config';
import app, { init } from '@/app';
import { Credential } from '@prisma/client';
import { CredentialSchema } from '@/schema';

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe('GET /credential', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/credential');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/credential').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/credential').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {

    it('should respond with status 204 when there is no credential created by the user', async () => {
      const token = await generateValidToken();

      const response = await server.get('/credential').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NO_CONTENT);
    });

    it('should respond with status 200 and credential list when there are credentials created by the user', async () => {
      const user = await createUser();
      const credential:Credential[] = [
        await createCredentialFactory(user, "password"),
        await createCredentialFactory(user, "password")]
      const token = await generateValidToken(user);

      const response = await server.get('/credential').set('Authorization', `Bearer ${token}`);
      
      credential[0].password = "password"
      credential[1].password = "password"

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(expect.arrayContaining([
        ...credential
      ]));
    });
  });
});

describe('GET /credential/id', () => {
  describe('when token is valid', () => {
    it('should respond with status 200 and credential data for given credential Id', async () => {
      const user = await createUser();
      const credential = await createCredentialFactory(user, "password");
      const token = await generateValidToken(user);

      const response = await server.get(`/credential/${credential.id}`).set('Authorization', `Bearer ${token}`);

      credential.password = "password"


      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        id: credential.id,
        password: credential.password,
        title: credential.title,
        url: credential.url,
        userId: credential.userId,
        username: credential.username,        
      }as Credential);
    });
  });
});

describe('POST /credential', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.post('/credential');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.post('/credential').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post('/credential').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 400 when body is not present', async () => {
      const token = await generateValidToken();

      const response = await server.post('/credential').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 400 when body is not valid', async () => {
      const token = await generateValidToken();
      const body = { [faker.lorem.word()]: faker.lorem.word() };

      const response = await server.post('/credential').set('Authorization', `Bearer ${token}`).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    describe('when body is valid', () => {
      const generateValidBody = () => ({
        title: faker.company.name(),
        url: faker.internet.url(),
        password: faker.internet.password(10),
        username: faker.internet.userName(),
      }as CredentialSchema);

      it('should respond with status 201 and create new credential if user doesnt already have one with same title', async () => {
        const body = generateValidBody();
        const user = await createUser()
        const token = await generateValidToken(user);

        const response = await server.post('/credential').set('Authorization', `Bearer ${token}`).send(body);

        expect(response.status).toBe(httpStatus.OK);
        const credential = await prisma.credential.findFirst({ where: { title: body.title, userId: user.id} });
        expect(credential).toBeDefined();
      });
      
    });
  });
});


describe('DELETE /credential/id', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.delete('/credential/1');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.delete('/credential/1').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.delete('/credential/1').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 400 when param is not valid', async () => {
      const token = await generateValidToken();

      const response = await server.delete('/credential/a').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    describe('when param is valid', () => {

      it('should respond with status 404 if the credential doesnt exists', async () => {
        const tokenFromUser1 = await generateValidToken();

        const response = await server.delete('/credential/'+5_000_000)
        .set('Authorization', `Bearer ${tokenFromUser1}`);

        expect(response.status).toBe(httpStatus.NOT_FOUND);
      });

      it('should respond with status 401 if the credential wasnt created by the user', async () => {
        const tokenFromUser1 = await generateValidToken();
        const credentialFromUser2 = await createCredentialFactory()

        const response = await server.delete('/credential/'+credentialFromUser2.id)
        .set('Authorization', `Bearer ${tokenFromUser1}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      });

      it('should respond with status 200 and delete if its user credential', async () => {
        const user = await createUser()
        const token = await generateValidToken(user);
        const credential = await createCredentialFactory(user)

        const response = await server.delete('/credential/'+credential.id)
        .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.OK);
        const query = await prisma.credential.findFirst({ where: { id:credential.id } });
        expect(query).toBeNull();
      });
      
    });
  });
});
