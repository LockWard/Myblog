import { Router } from 'express';

import * as voteControllers from '../controllers/vote.controllers.js';

const router: Router = Router()

router.get('/', voteControllers.getAllVotes)

export default router