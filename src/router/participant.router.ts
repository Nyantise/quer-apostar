import { postParticipant } from "@controller";
import { validateBody } from "@middleware";
import { participantSchema } from "@schema";
import { Router } from "express";

const participantsRouter = Router();

participantsRouter.post("/", validateBody(participantSchema), postParticipant);

export { participantsRouter };