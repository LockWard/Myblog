import { Router } from 'express';
import passport from 'passport';

import * as postControllers from '../controllers/post.controllers.js';
import { isAdmin, isModerator } from '../middlewares/checkRoles.js';

const router: Router = Router();

router.get('/', postControllers.getAllPosts);

router.get('/:post_id', postControllers.getPostById);

router.post('/', passport.authenticate('jwt', { session: false }), postControllers.createPost);

router.put('/:post_id', passport.authenticate('jwt', { session: false }), postControllers.updatePost);

router.delete('/delete/:post_id', passport.authenticate('jwt', { session: false }), [isModerator, isAdmin], postControllers.deletePost);

export default router;


