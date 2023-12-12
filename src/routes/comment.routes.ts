import { Router } from 'express';

import * as commentControllers from '../controllers/comment.controllers.js';

const router: Router = Router()

router.get('/', commentControllers.getAllComments)

router.get('/:comment_id', commentControllers.getCommentById)

router.post('/', commentControllers.postComment)

router.put('/:comment_id', commentControllers.putComment)

router.delete('/:comment_id', commentControllers.deleteComment)

export default router