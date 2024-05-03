import { Router } from 'express';
import passport from 'passport';

import * as followerControllers from '../controllers/follower.controllers.js';

const router: Router = Router();

router.post('/', passport.authenticate('jwt', { session: false }), followerControllers.createFollower);

router.delete('/', passport.authenticate('jwt', { session: false }), followerControllers.deleteFollower);

export default router;