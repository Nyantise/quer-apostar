import { Credential } from '@prisma/client';
import Joi from 'joi';


export const credentialSchema = Joi.object<CredentialSchema>({
    title: Joi.string().min(4).required(),
    url: Joi.string().uri().required(),
    username: Joi.string().min(4).required(),
    password: Joi.string().min(6).required(),
});

export type CredentialSchema = Pick<Credential, 'username' | 'password' | 'title' | 'url'>;
export type CreateCredential = CredentialSchema & {
    userId: number
};