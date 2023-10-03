import { finishGame, getGameInfo, getGames, postGame } from "@/controller";
import { validateBody, validateParams } from "@/middleware";
import { finishGameSchema, gameSchema } from "@/schema";
import { Router } from "express";

const gameRouter = Router();

gameRouter.post("/", validateBody(gameSchema), postGame);
gameRouter.get("/", getGames);
gameRouter.get("/:id", validateParams, getGameInfo);
gameRouter.post("/:id/finish", validateParams, validateBody(finishGameSchema), finishGame);

export { gameRouter };
