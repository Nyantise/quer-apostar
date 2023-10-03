import { faker } from '@faker-js/faker';
import { Credential, User } from '@prisma/client';

import { createUser } from './auth-factory';
import { prisma } from '@/config';
import { cryptrThis } from '@/util/cryptr';

export async function createCredentialFactory(user?: User, pass?:string): Promise<Credential> {
  const incomingUser = user || (await createUser());
  const incomingPass = pass || faker.internet.password(10)

  return await prisma.credential.create({
    data: {
      title:faker.company.name(),
      url:faker.internet.url(),
      username:faker.internet.displayName(),
      password:cryptrThis(incomingPass),
      userId: incomingUser.id,     
    },
  });
}