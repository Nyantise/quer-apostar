import { CreateCredential } from '@/schema';
import credentialService from '@/service/credential-service';
import { duplicatedCredential } from '@/service/credential-service/errors';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function credentialPost(req: Request, res: Response) {
  const body = {
    ...req.body,
    userId: res.locals.userId
    } as CreateCredential
  try {
    const result = await credentialService.create(body);
    return res.status(httpStatus.OK).send(result);

  } catch (error) {
    if(error.code === "P2002"){
      const {code, content} = duplicatedCredential()
      return res.status(code).send(content)      
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function credentialGet(req: Request, res: Response) {
    const { params, userId } = res.locals;

    try {
      const result = await credentialService.gotcha(userId, params.id);
  
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      if(error.code){
        return res.status(error.code).send(error.content);
      }
      return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function credentialDelete(req: Request, res: Response) {
    const { params, userId } = res.locals;

    try {
      const result = await credentialService.deleteById(userId, params.id);
  
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      if(error.code){
        return res.status(error.code).send(error.content);
      }
      return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
