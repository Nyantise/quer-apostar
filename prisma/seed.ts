import { Bet, PrismaClient, Game, Participant } from "@prisma/client";
import { seedGame, seedParticipants, seedBets } from "./seedFunctions";
const prisma = new PrismaClient();

async function main() {
  let game: Game | null = await prisma.game.findFirst();
  let participants: Participant[] = await prisma.participant.findMany();
  let bets: Bet[] = await prisma.bet.findMany();

  if (!game) game = await seedGame()
  console.log("Seed Game...OK")

  if (participants.length === 0) participants = await seedParticipants()
  console.log("Seed Participants...OK")

  if (bets.length === 0 && game) await seedBets(game, participants);
  console.log("Seed Bets...OK")
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });