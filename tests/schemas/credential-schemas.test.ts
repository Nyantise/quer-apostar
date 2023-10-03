import {faker} from '@faker-js/faker';
import { CredentialSchema, credentialSchema } from '@/schema';

describe('credentialSchema', () => {
  const generateValidInput = () => ({
    title: faker.internet.domainWord(),
    url: faker.internet.url(),
    username: faker.internet.userName(),
    password: faker.internet.password()
  }as CredentialSchema);

  describe('when title is not valid', () => {
    it('should return error if title is not present', () => {
      const input = generateValidInput();
      delete input.title;

      const { error } = credentialSchema.validate(input);

      expect(error).toBeDefined();
    });

    it('should return error if title is shorter than 4 characters', () => {
      const input = generateValidInput();
      input.title = faker.lorem.word(3);

      const { error } = credentialSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe('when username is not valid', () => {
    it('should return error if title is not present', () => {
      const input = generateValidInput();
      delete input.username;

      const { error } = credentialSchema.validate(input);

      expect(error).toBeDefined();
    });

    it('should return error if username is shorter than 4 characters', () => {
      const input = generateValidInput();
      input.username = faker.lorem.word(3);

      const { error } = credentialSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe('when password is not valid', () => {
    it('should return error if password is not present', () => {
      const input = generateValidInput();
      delete input.password;

      const { error } = credentialSchema.validate(input);

      expect(error).toBeDefined();
    });

    it('should return error if password is shorter than 6 characters', () => {
      const input = generateValidInput();
      input.password = faker.lorem.word(5);

      const { error } = credentialSchema.validate(input);

      expect(error).toBeDefined();
    });
  });
  describe('when url is not valid', () => {
    it('should return error if network is not present', () => {
      const input = generateValidInput();
      delete input.url;

      const { error } = credentialSchema.validate(input);

      expect(error).toBeDefined();
    });

    it('should return error if url in incorrect format', () => {
      const input = generateValidInput();
      input.url = faker.lorem.word(10);

      const { error } = credentialSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  it('should return no error if input is valid', () => {
    const input = generateValidInput();

    const { error } = credentialSchema.validate(input);

    expect(error).toBeUndefined();
  });
});
