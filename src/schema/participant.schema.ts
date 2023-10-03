import Joi from "joi";

export const participantSchema = Joi.object({
  name: Joi.string().required(),
  balance: Joi.number().integer().required().min(1000),
});

export interface ParticipantType {
  name: string;
  balance: number;
}