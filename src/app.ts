import 'express-async-errors';
import express, { Express } from 'express';

import { loadEnv, connectDb, disconnectDB } from '@config';

loadEnv();

import { handleApplicationErrors } from '@middleware';
import { participantsRouter } from '@router';

const app = express();
app
  .use(express.json())
  .use('/participants', participantsRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;