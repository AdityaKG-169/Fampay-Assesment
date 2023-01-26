import { Router } from 'express';

import getPaginatedVideosController from './controllers.videos';

const router = Router();

router.get('/', getPaginatedVideosController);

export default router;
