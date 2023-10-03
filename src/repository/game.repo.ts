import { prisma } from "@/config";
import { GameType, finishGameType } from "@/schema";

export function create (data: GameType) {
  return prisma.game.create({
    data,
  });
};

export function findMany () {
  return prisma.game.findMany();
};

export function findId (id: number) {
  return prisma.game.findUnique({
    where: {id}
  });
};

export function findByTeamsNames (data: GameType) {
  return prisma.game.findFirst({
    where: data,
  });
};

export function finish (id: number, data: finishGameType) {
  return prisma.game.update({
    where: {id},
    data: {
      homeTeamScore: data.homeTeamScore,
      awayTeamScore: data.awayTeamScore,
      isFinished: true,
    },
  });
};

export function findIdWithBets (id: number) {
  return prisma.game.findUnique({
    where: {id},
    include: {bets:true}
  });
};
