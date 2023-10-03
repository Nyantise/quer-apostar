import { SignInParams } from '@/service/auth-service';
import authenticationService from '@/service/auth-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function loginPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  try {
    const result = await authenticationService.signIn({ email, password });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.code) {
      return res.status(error.code).send(error.content);
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({});
  }
}

export async function registerPost(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await authenticationService.createUser({ email, password });
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    if (error.code) {
      return res.status(error.code).send(error.content);
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}
