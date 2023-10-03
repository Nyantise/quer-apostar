import { postBet } from "@controller";
import { validateBody } from "@middleware";
import { betSchema } from "@schema";
import { Router } from "express";

const betRouter = Router();

betRouter.post("/", validateBody(betSchema), postBet);

export { betRouter };
