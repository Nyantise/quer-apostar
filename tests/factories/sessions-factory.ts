import { Session } from '@prisma/client';
import { createUser } from './auth-factory';
import { prisma } from '@/config';

export async function createSession(token: string, userId:number): Promise<Session> {
  return await prisma.session.create({
    data: {
      token: token,
      userId: userId,
    },
  });
}
