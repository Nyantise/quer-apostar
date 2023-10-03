import Joi from "joi";

export const gameSchema = Joi.object<GameType>({
  homeTeamName: Joi.string().required(),
  awayTeamName: Joi.string().required(),
});

export const finishGameSchema = Joi.object({
  homeTeamScore: Joi.number().required(),
  awayTeamScore: Joi.number().required(),
});

export interface GameType {
  homeTeamName: string;
  awayTeamName: string;
}

export interface finishGameType {
  homeTeamScore: number;
  awayTeamScore: number;
}