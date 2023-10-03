import { Router } from 'express';
import { validateBody } from '@/middleware';
import { loginPost, registerPost } from '@/controller';

import { createUserSchema, signInSchema } from '@/schema';

const authenticationRouter = Router();

authenticationRouter.post('/sign-in', validateBody(signInSchema), loginPost);
authenticationRouter.post('/sign-up', validateBody(createUserSchema), registerPost);

export { authenticationRouter };
