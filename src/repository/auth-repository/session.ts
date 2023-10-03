import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function create(data: Prisma.SessionUncheckedCreateInput) {
  return prisma.session.create({
    data,
  });
}

const session = {
  create
}
export default session