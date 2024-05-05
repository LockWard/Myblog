import { Router } from 'express';

import auth_Routes from './auth.routes.js';
import user_Routes from './user.routes.js';
import follower from './follower.routes.js';
import post_Routes from './post.routes.js';
import post_vote_Routes from './post_vote.routes.js';
import comment_Routes from './comment.routes.js';
import comment_vote_Routes from './comment_vote.routes.js';

const router: Router = Router();

router.use('/api/auth', auth_Routes);
router.use('/api/user', user_Routes);
router.use('/api/follower', follower);
router.use('/api/post', post_Routes);
router.use('/api/post_vote', post_vote_Routes);
router.use('/api/comment', comment_Routes);
router.use('/api/comment_vote', comment_vote_Routes);

export default router;