import { Router } from 'express';

import * as commentControllers from '../controllers/comment.controllers.js';

const router: Router = Router()

router.get('/', commentControllers.getAllComments)

export default router