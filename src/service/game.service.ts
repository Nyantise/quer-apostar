import { MyError } from "../protocols";
import { GameType, finishGameType } from "../schema";
import httpStatus from "http-status";
import * as games from "../repository/game.repo";
import * as bets from "../repository/bet.repo";
import * as participants from "../repository/participant.repo";
import { Bet } from "@prisma/client";


export async function postGame (data: GameType) {
    if (data.homeTeamName === data.awayTeamName){
        throw new MyError(httpStatus.NOT_ACCEPTABLE, "Teams with equal names");
    }
    const registeredGame = await games.findByTeamsNames(data);
    if (registeredGame) throw new MyError(httpStatus.NOT_ACCEPTABLE, "Already registered game");
  
    return games.create(data);
};

//-------------------------------

export async function getGames () {
    return await games.findMany();
};

//-------------------------------

export async function getGameById (id: number) {
    const game = await games.findId(id);
    if (!game) throw new MyError(httpStatus.NOT_FOUND, "Game not found");

    return game;
};

//-------------------------------

export async function getGameInfo (id: number) {
    const game = await games.findIdWithBets(id);
    if (!game) throw new MyError(httpStatus.NOT_FOUND, "Game not found");
  
    return game;
};

//-------------------------------


async function processBets (thisbets: Bet[], game:finishGameType) {
    const houseGain = 0.3;
    const winners:Bet[] = []
    let totalMoney = 0
    let winnersMoney = 0
  
    for await (const bet of thisbets){
      if (bet.status === "PENDING") return totalMoney += bet.amountBet;
      if (bet.homeTeamScore === game.homeTeamScore && bet.awayTeamScore === game.awayTeamScore){
        winnersMoney += bet.amountBet
        winners.push(bet)
      }
      else{ await bets.changeStatus(bet.id, "LOST", 0) }
    }
  
    for await (const winner of winners){
      const moneyEarned = (winner.amountBet / winnersMoney) * totalMoney * (1 - houseGain)
      await bets.changeStatus(winner.id, "WON", moneyEarned)
      const user = await participants.findId(winner.participantId)
      const newBalance = user.balance + moneyEarned
      participants.discountBalance(winner.participantId, newBalance)
    }
  };
  
export async function finishGame (data: finishGameType, id: number) {
  const game = await games.findIdWithBets(id);
  if (game.isFinished) throw new MyError(httpStatus.BAD_REQUEST, "Game is finished");

  const bets = game.bets;

  await processBets(bets, game);

  return await games.finish(Number(id), data);
};
