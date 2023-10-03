import {faker} from '@faker-js/faker';
import { NetworkSchema, networkSchema } from '@/schema';

describe('networkSchema', () => {
  const generateValidInput = () => ({
    title: faker.company.name(),
    network: faker.internet.ip(),
    password: faker.internet.password(10),
  }as NetworkSchema);

  describe('when title is not valid', () => {
    it('should return error if title is not present', () => {
      const input = generateValidInput();
      delete input.title;

      const { error } = networkSchema.validate(input);

      expect(error).toBeDefined();
    });

    it('should return error if title is shorter than 4 characters', () => {
      const input = generateValidInput();
      input.title = faker.lorem.word(3);

      const { error } = networkSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe('when password is not valid', () => {
    it('should return error if password is not present', () => {
      const input = generateValidInput();
      delete input.password;

      const { error } = networkSchema.validate(input);

      expect(error).toBeDefined();
    });

    it('should return error if password is shorter than 6 characters', () => {
      const input = generateValidInput();
      input.password = faker.lorem.word(5);

      const { error } = networkSchema.validate(input);

      expect(error).toBeDefined();
    });
  });
  describe('when network is not valid', () => {
    it('should return error if network is not present', () => {
      const input = generateValidInput();
      delete input.network;

      const { error } = networkSchema.validate(input);

      expect(error).toBeDefined();
    });

    it('should return error if network is shorter than 4 characters', () => {
      const input = generateValidInput();
      input.network = faker.lorem.word(3);

      const { error } = networkSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  it('should return no error if input is valid', () => {
    const input = generateValidInput();

    const { error } = networkSchema.validate(input);

    expect(error).toBeUndefined();
  });
});
