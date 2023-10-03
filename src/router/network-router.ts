import { Router } from 'express';
import { networkSchema } from '@/schema';
import { authenticateToken, validateBody, validateParams } from '@/middleware';
import { networkDelete, networkGet, networkPost } from '@/controller/network-controller';


const networkRouter = Router();

networkRouter
    .all('/*', authenticateToken)
    .post('/', validateBody(networkSchema), networkPost)
    .get('/:id?', validateParams(), networkGet)
    .delete('/:id', validateParams(), networkDelete)

export { networkRouter };