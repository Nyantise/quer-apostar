import { Router } from 'express';
import { credentialSchema } from '@/schema';
import { authenticateToken, validateBody, validateParams } from '@/middleware';
import { credentialDelete, credentialGet, credentialPost } from '@/controller/credentials-controller';


const credentialRouter = Router();

credentialRouter
    .all('/*', authenticateToken)
    .post('/', validateBody(credentialSchema), credentialPost)
    .get('/:id?', validateParams(), credentialGet)
    .delete('/:id', validateParams(), credentialDelete)

export { credentialRouter };