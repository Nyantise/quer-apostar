import { prisma } from "@config";
import { ParticipantType } from "@schema";

export function create (data: ParticipantType) {
  return prisma.participant.create({
    data,
  });
};

export function findMany () {
  return prisma.participant.findMany();
};

export function findId (id: number) {
  return prisma.participant.findUnique({
    where: {
      id,
    },
  });
};

export function findName (name: string) {
  return prisma.participant.findFirst({
    where: {
      name,
    },
  });
};

export function discountBalance (userId: number, amount: number) {
  return prisma.participant.update({
    where: {id: userId},
    data: {
      balance: {
        decrement: amount,
      },
    },
  });
};