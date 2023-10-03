import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

//-----------------------------------------------------------------
async function create(data: Prisma.CredentialUncheckedCreateInput) {
  return prisma.credential.create({
    data,
  });
}

//-----------------------------------------------------------------

async function findById(id: number) {
  const params: Prisma.CredentialFindUniqueArgs = {
    where: {
      id,
    },
  };

  return prisma.credential.findUnique(params);
}

//-----------------------------------------------------------------

async function findAll(userId: number) {
    const params: Prisma.CredentialFindManyArgs = {
    where:{
            userId
        }
    };
  
    return prisma.credential.findMany(params);
  }

//-----------------------------------------------------------------

async function deleteById(userId:number, id:number) {
  const params: Prisma.CredentialDeleteArgs = {
    where:{
            id,
            userId
        }
    };
  
    return prisma.credential.delete(params);
}

const credentialRepository = {
  findAll,
  findById,
  create,
  deleteById
};

export default credentialRepository;
