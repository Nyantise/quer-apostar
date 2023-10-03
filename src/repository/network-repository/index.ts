import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

//-----------------------------------------------------------------
async function create(data: Prisma.NetworkUncheckedCreateInput) {
  return prisma.network.create({
    data,
  });
}

//-----------------------------------------------------------------

async function findById(id: number) {
  const params: Prisma.NetworkFindUniqueArgs = {
    where: {
      id
    },
  };

  return prisma.network.findUnique(params);
}

//-----------------------------------------------------------------

async function findAll(userId: number) {
    const params: Prisma.NetworkFindManyArgs = {
    where:{
            userId
        }
    };
  
    return prisma.network.findMany(params);
  }

//-----------------------------------------------------------------

async function deleteById(userId:number, id:number) {
  const params: Prisma.NetworkDeleteArgs = {
    where:{
            id,
            userId
        }
    };
  
    return prisma.network.delete(params);
}

const networkRepository = {
  findAll,
  findById,
  create,
  deleteById
};

export default networkRepository;
