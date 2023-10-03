import { MyError } from "@protocols";
import { Request, Response } from "express";
import httpStatus from "http-status";
import * as games from "@service/game.service"

export const postGame = async (req: Request, res: Response) => {
  try {
    const result = await games.postGame(req.body);
    res.status(httpStatus.CREATED).send(result);
  } catch (err) {
    if (err instanceof MyError) {
      res.status(err.status).send(err.message);
    } else {
      res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
};

export const getGames = async (req: Request, res: Response) => {
  try {
    const result = await games.getGames();
    res.status(httpStatus.OK).send(result);
  } catch (err) {
    if (err instanceof MyError) {
      res.status(err.status).send(err.message);
    } else {
      res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
};

export const getGameInfo = async (req: Request, res: Response) => {
  try {
    const result = await games.getGameInfo(res.locals.params.id);
    res.status(httpStatus.OK).send(result);
  } catch (err) {
    if (err instanceof MyError) {
      res.status(err.status).send(err.message);
    } else {
      res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
};

export const finishGame = async (req: Request, res: Response) => {
  try {
    const result = await games.finishGame(req.body, res.locals.params.id);
    res.status(httpStatus.OK).send(result);
  } catch (err) {
    if (err instanceof MyError) {
      res.status(err.status).send(err.message);
    } else {
      res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
};
