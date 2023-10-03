import { prisma } from "@config";
import { Status } from "@prisma/client";
import { BetType } from "@schema";

export function create (data: BetType) {
  return prisma.bet.create({
    data,
  });
};

export function findByUserAndGameID (gameId: number, participantId: number) {
  return prisma.bet.findFirst({
    where: {
      gameId: gameId,
      participantId: participantId,
    },
  });
};

export function changeStatus (id: number, status: Status, amountWon: number) {
  return prisma.bet.update({
    where: {
      id,
    },
    data: {
      status,
      amountWon,
      updatedAt: new Date(),
    },
  });
};
