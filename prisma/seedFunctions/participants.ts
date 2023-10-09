import { Participant, PrismaClient } from "@prisma/client";
import { fakerPT_BR } from "@faker-js/faker";

const prisma = new PrismaClient

//Seed Event ------------------------- Seed Event
export async function seedParticipants() {
  const arr:Participant[] = []
  for await (const part of manyParticipants()){
    arr.push(await prisma.participant.create({data: part}))
  }
  return arr
}

const manyParticipants = () =>{
  const arr:{}[] = []
  for(let i=0; i < 40; i++){
    arr.push({
      name: fakerPT_BR.person.firstName(),
      balance: fakerPT_BR.number.int({min:1000, max:10000})
    })
  }

  return arr as PartCreate[]
}

type PartCreate = {
  name: string,
  balance: number
}