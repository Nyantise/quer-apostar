import { Request, Response } from "express";
import httpStatus from "http-status";
import { createBet } from "../service/bet.service";
import { MyError } from "../protocols";

export const postBet = async (req: Request, res: Response) => {
  try {
    const bet = await createBet(req.body);
    res.status(httpStatus.CREATED).json(bet);
  } catch (err) {
    if (err instanceof MyError) {
      res.status(err.status).send(err.message);
    } else {
      res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
  }
};
