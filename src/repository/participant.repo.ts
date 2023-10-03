import { prisma } from "@config";
import { ParticipantType } from "@schema";

export const create = (data: ParticipantType) => {
  return prisma.participant.create({
    data,
  });
};

export const findMany = () => {
  return prisma.participant.findMany();
};

export const findId = (id: number) => {
  return prisma.participant.findUnique({
    where: {
      id,
    },
  });
};

export const findName = (name: string) => {
  return prisma.participant.findFirst({
    where: {
      name,
    },
  });
};