import { MyError } from "../protocols";
import * as participants from "../repository/participant.repo";
import { ParticipantType } from "../schema";
import httpStatus from "http-status";

export async function createParticipant (data: ParticipantType){
  const account = await participants.findName(data.name);
  if (account) throw new MyError(httpStatus.CONFLICT, "Participant already registered");

  return participants.create(data);
};

export async function findParticipants () {
  return participants.findMany();
};
