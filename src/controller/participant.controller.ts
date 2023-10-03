import { createParticipant } from "@service/participant.service";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { MyError} from '@protocols';


export const postParticipant = async (req: Request, res: Response) => {
    try {
      const result = await createParticipant(req.body);
      res.status(httpStatus.CREATED).send(result);
    } catch (err) {
      if (err instanceof MyError) {
        return res.status(err.status).send(err.message);
      } 
      res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  };