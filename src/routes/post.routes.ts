import { Router } from 'express';

import * as postControllers from '../controllers/post.controllers.js';

const router: Router = Router()

router.get('/', postControllers.getAllPosts)

router.get('/:post_id', postControllers.getPostById)

router.post('/', postControllers.postPost)

router.put('/:post_id', postControllers.putPost)

router.delete('/:post_id', postControllers.deletePost)

export default router


