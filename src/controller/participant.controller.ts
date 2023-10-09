import { createParticipant, findParticipants } from "../service/participant.service";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { MyError} from '../protocols';

export async function postParticipant (req: Request, res: Response) {
    try {
      const result = await createParticipant(req.body);
      res.status(httpStatus.CREATED).send(result);
    }
    catch (err) {
      if (err instanceof MyError) {
        return res.status(err.status).send(err.message);
      } 
      res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
};

export async function getParticipants (req: Request, res: Response) {
  try {
    const result = await findParticipants();
    res.status(httpStatus.OK).send(result);
  }
  catch (err) {
    if (err instanceof MyError) {
      res.status(err.status).send(err.message);
    } else {
      res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
};
