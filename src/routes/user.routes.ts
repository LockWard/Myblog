import { Router } from 'express';
import passport from 'passport';
import { isAdmin, isModerator } from '../middlewares/checkRoles.js';

import * as userControllers from '../controllers/user.controllers.js';

const router: Router = Router();

router.get('/', userControllers.getAllUsers);

router.get('/:user_id', userControllers.getUserById);

router.get('/search/name', userControllers.getUserByUserhandle);

router.post('/', userControllers.createUser);

router.put('/:user_id', passport.authenticate('jwt', { session: false }), userControllers.updateUser);

router.delete('/:user_id', passport.authenticate('jwt', { session: false }), [isModerator, isAdmin], userControllers.deleteUser);

export default router;