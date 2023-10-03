import {faker} from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { createUser } from '../factories';
import { cleanDb } from '../helpers';
import app, { init } from '@/app';
import { duplicatedEmailError } from '@/service/auth-service/errors';
import { prisma } from '@/config';

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe('POST /auth/sign-up', () => {
  it('should respond with status 400 when body is not given', async () => {
    const response = await server.post('/auth/sign-up');

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 400 when body is not valid', async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post('/auth/sign-up').send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe('when body is valid', () => {
    const generateValidBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password(10),
    });

      it('should respond with status 409 when there is an user with given email', async () => {
        const body = generateValidBody();
        await createUser(body);

        const response = await server.post('/auth/sign-up').send(body);

        expect(response.status).toBe(httpStatus.CONFLICT);
        expect(response.body).toEqual(duplicatedEmailError().content);
      });

      it('should respond with status 201 and create user when given email is unique', async () => {
        const body = generateValidBody();

        const response = await server.post('/auth/sign-up').send(body);

        expect(response.status).toBe(httpStatus.CREATED);
        expect(response.body).toEqual({
          id: expect.any(Number),
          email: body.email,
        });
      });

      it('should not return user password on body', async () => {
        const body = generateValidBody();

        const response = await server.post('/auth/sign-up').send(body);

        expect(response.body).not.toHaveProperty('password');
      });

      it('should save user on db', async () => {
        const body = generateValidBody();

        const response = await server.post('/auth/sign-up').send(body);

        const user = await prisma.user.findUnique({
          where: { email: body.email },
        });
        expect(user).toEqual(
          expect.objectContaining({
            id: response.body.id,
            email: body.email,
          }),
        );
      });
    });
  });


describe('POST /auth/sign-in', () => {
  it('should respond with status 400 when body is not given', async () => {
    const response = await server.post('/auth/sign-in');

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 400 when body is not valid', async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post('/auth/sign-in').send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

describe('when body is valid', () => {
  const generateValidBody = () => ({
    email: faker.internet.email(),
    password: faker.internet.password(10),
  });

  it('should respond with status 401 if there is no user for given email', async () => {
    const body = generateValidBody();

    const response = await server.post('/auth/sign-in').send(body);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is a user for given email but password is not correct', async () => {
    const body = generateValidBody();
    await createUser(body);

    const response = await server.post('/auth/sign-in').send({
      ...body,
      password: faker.internet.password(10),
    });

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

describe('when credentials are valid', () => {
  it('should respond with status 200', async () => {
    const body = generateValidBody();
    await createUser(body);

    const response = await server.post('/auth/sign-in').send(body);

    expect(response.status).toBe(httpStatus.OK);
  });

  it('should respond with user data', async () => {
    const body = generateValidBody();
    const user = await createUser(body);

    const response = await server.post('/auth/sign-in').send(body);

    expect(response.body.user).toEqual({
      id: user.id,
      email: user.email,
    });
  });

  it('should respond with session token', async () => {
    const body = generateValidBody();
    await createUser(body);

    const response = await server.post('/auth/sign-in').send(body);

    expect(response.body.token).toBeDefined();
  });
    });
  });
});
