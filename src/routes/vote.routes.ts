import { Router } from 'express';

import * as voteControllers from '../controllers/vote.controllers.js';

const router: Router = Router()

router.get('/', voteControllers.getAllVotes)

router.get('/:vote_id', voteControllers.getVoteById)

router.post('/', voteControllers.postVote)

router.put('/:vote_id', voteControllers.putVote)

router.delete('/:vote_id', voteControllers.deleteVote)

export default router