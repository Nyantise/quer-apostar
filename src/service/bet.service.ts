import * as games from "../repository/game.repo";
import * as participants from "../repository/participant.repo";
import * as bets from "../repository/bet.repo";
import { MyError } from "../protocols";
import httpStatus from "http-status";
import { BetType } from "../schema";

export async function createBet (data: BetType) {
  if (data.amountBet < 100) throw new MyError(httpStatus.BAD_REQUEST, "Minimum value: $ 1,00");

  const user = await participants.findId(data.participantId);
  if (!user) throw new MyError(httpStatus.NOT_FOUND, "Participant not found");

  const game = await games.findId(data.gameId);
  if (!game) throw new MyError(httpStatus.NOT_FOUND, "Game not found");
  if (game.isFinished) throw new MyError(httpStatus.BAD_REQUEST, "Game is finished");

  const bet = await bets.findByUserAndGameID(game.id, user.id);
  if (bet) throw new MyError(httpStatus.BAD_REQUEST, "Bet already registred");

  if (user.balance < data.amountBet) throw new MyError(httpStatus.PAYMENT_REQUIRED, "Insufficient balance");
  await participants.discountBalance(user.id, data.amountBet);

  return await bets.create(data);
};
