import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function cleanDb() {
  await prisma.bet.deleteMany({});
  await prisma.game.deleteMany({});
  await prisma.participant.deleteMany({});
}
