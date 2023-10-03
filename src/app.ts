import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';

import { loadEnv, connectDb, disconnectDB } from '@/config';

loadEnv();

import { handleApplicationErrors } from '@/middleware';
import {
  authenticationRouter, credentialRouter, networkRouter,
} from '@/router';

const app = express();
app
  .use(cors())
  .use(express.json())
  .use('/auth', authenticationRouter)
  .use('/credential', credentialRouter)
  .use('/network', networkRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;