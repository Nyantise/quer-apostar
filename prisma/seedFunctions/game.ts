import { PrismaClient } from "@prisma/client";
import { fakerPT_BR } from "@faker-js/faker";

const prisma = new PrismaClient

//Seed Activity ------------------------- Seed Activity
export async function seedGame() {
    return await prisma.game.create({
      data: {
        awayTeamName: fakerPT_BR.company.name(),
        homeTeamName: fakerPT_BR.company.name(),
      },
    });
  }