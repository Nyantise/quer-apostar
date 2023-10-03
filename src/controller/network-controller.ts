import { CreateNetwork } from '@/schema/network-schema';
import networkService from '@/service/network-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function networkPost(req: Request, res: Response) {
  const body = {
    ...req.body,
    userId: res.locals.userId
    } as CreateNetwork
  try {
    const result = await networkService.create(body);
    return res.status(httpStatus.OK).send(result);

  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function networkGet(req: Request, res: Response) {
    const { params, userId } = res.locals;

    try {
      const result = await networkService.gotcha(userId, params.id);
  
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      if(error.code){
        return res.status(error.code).send(error.content);
      }
      return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function networkDelete(req: Request, res: Response) {
    const { params, userId } = res.locals;

    try {
      const result = await networkService.deleteById(userId, params.id);
  
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      if(error.code){
        return res.status(error.code).send(error.content);
      }
      return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
