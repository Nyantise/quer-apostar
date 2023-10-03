import { invalidDataError } from '@/error';
import { paramSchema } from '@/schema/param-schema';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ObjectSchema } from 'joi';

export function validateBody<T>(schema: ObjectSchema<T>): ValidationMiddleware {
  return validate(schema, 'body');
}

export function validateParams<T>(): ValidationMiddleware {
  return validate(paramSchema as ObjectSchema<T>, 'params');
}

function validate(schema: ObjectSchema, type: 'body' | 'params') {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[type], {
      abortEarly: false,
    });
    res.locals[type] = value
    if (!error) {
      next();
    } else {
      res.status(httpStatus.BAD_REQUEST).send(invalidDataError(error.details.map((d) => d.message)));
    }
  };
}

type ValidationMiddleware = (req: Request, res: Response, next: NextFunction) => void;
