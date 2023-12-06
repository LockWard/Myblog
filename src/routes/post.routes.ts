import { Router } from 'express';

import * as postControllers from '../controllers/post.controllers.js';

const router: Router = Router()

router.get('/', postControllers.getAllPosts)

export default router


