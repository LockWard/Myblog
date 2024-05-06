import { Router } from 'express';
import passport from 'passport';

import * as comment_voteControllers from '../controllers/comment_vote.controllers.js';

const router: Router = Router();

router.post('/', passport.authenticate('jwt', { session: false }), comment_voteControllers.createComment_vote);

router.delete('/', passport.authenticate('jwt', { session: false }), comment_voteControllers.deleteComment_vote);

export default router;