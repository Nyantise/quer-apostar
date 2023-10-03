import Joi from "joi";

export const betSchema = Joi.object<BetType>({
  homeTeamScore: Joi.number().required(),
  awayTeamScore: Joi.number().required(),
  amountBet: Joi.number().required().min(100),
  gameId: Joi.number().required(),
  participantId: Joi.number().required(),
});

export interface BetType {
  homeTeamScore: number;
  awayTeamScore: number;
  amountBet: number;
  gameId: number;
  participantId: number;
}
