import { Network } from '@prisma/client';
import Joi from 'joi';


export const networkSchema = Joi.object<NetworkSchema>({
    title: Joi.string().min(4).required(),
    network: Joi.string().min(4).required(),
    password: Joi.string().min(6).required(),
});

export type NetworkSchema = Pick<Network, 'title' | 'network' | 'password' >;
export type CreateNetwork = NetworkSchema & {
    userId: number
};