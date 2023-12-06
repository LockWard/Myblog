import { Router } from 'express';

import * as userControllers from '../controllers/user.controllers.js';

const router: Router = Router()

router.get('/', userControllers.getAllUsers)

router.get('/:user_id', userControllers.getUserById)

router.post('/', userControllers.postUser)

router.put('/:user_id', userControllers.putUser)

export default router