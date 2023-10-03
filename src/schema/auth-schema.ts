import Joi from 'joi';
import { SignInParams, CreateUserParams } from '@/service/auth-service';


export const signInSchema = Joi.object<SignInParams>({
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required(),
});

export const createUserSchema = Joi.object<CreateUserParams>({
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required(),
});
