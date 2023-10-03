import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';
import { Network, User } from '@prisma/client';
import { prisma } from '@/config';
import { createUser } from './auth-factory';
import { cryptrThis } from '@/util/cryptr';

export async function createNetworkFactory(user?:User, pass?:string): Promise<Network> {
  const incomingUser = user || (await createUser());
  const incomingPass = pass || faker.internet.password(10);
  return await prisma.network.create({
    data: {
      title: faker.company.name(),  
      network: faker.internet.ip(),
      password: cryptrThis(incomingPass),
      userId: incomingUser.id

    },
  });
}
