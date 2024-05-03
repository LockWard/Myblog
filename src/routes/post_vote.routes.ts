import { Router } from 'express';
import passport from 'passport';

import * as post_voteControllers from '../controllers/post_vote.controllers.js';

const router: Router = Router();

router.post('/', passport.authenticate('jwt', { session: false }), post_voteControllers.createPost_vote);

router.delete('/', passport.authenticate('jwt', { session: false }), post_voteControllers.deletePost_vote);

export default router;