import { Router } from 'express';
import passport from 'passport'

import * as commentControllers from '../controllers/comment.controllers.js';
import { isAdmin, isModerator } from '../middlewares/checkRoles.js';

const router: Router = Router();

router.get('/', commentControllers.getAllComments);

router.get('/:comment_id', commentControllers.getCommentById);

router.post('/', passport.authenticate('jwt', { session: false }), commentControllers.createComment);

router.put('/:comment_id', passport.authenticate('jwt', { session: false }), commentControllers.updateComment);

router.put('/delete/:comment_id', passport.authenticate('jwt', { session: false }), [isModerator, isAdmin], commentControllers.deleteComment);

export default router;
