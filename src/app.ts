import 'express-async-errors';
import express, { Express, Response, Request, Router } from 'express';
import { connectDb, disconnectDB } from './config';

import { handleApplicationErrors } from './middleware';
import { participantsRouter, gameRouter, betRouter } from './router';

const app = express();
app
  .use(express.json())
  .use(Router().get("/health", (req:Request, res:Response)=>{res.sendStatus(200)}))
  .use("/participants", participantsRouter)
  .use("/games", gameRouter)
  .use("/bets", betRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;