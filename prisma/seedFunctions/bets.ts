import { fakerPT_BR } from "@faker-js/faker"
import { PrismaClient, Bet, Participant, Game } from "@prisma/client"

const prisma = new PrismaClient

  //Seed Hotel ------------------------- Seed Hotel
export async function seedBets(game: Game, participants: Participant[]) {
    const arr:Bet[] = []
    for await(let participant of participants){
      arr.push(await prisma.bet.create({
        data: {
          amountBet: fakerPT_BR.number.int({min:100, max:1000}),
          awayTeamScore: fakerPT_BR.number.int({min:0, max:3}),
          homeTeamScore: fakerPT_BR.number.int({min:0, max:3}),
          gameId: game.id,
          participantId: participant.id,
        },
      }))
    }
    return arr
  }
