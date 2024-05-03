import { Router } from 'express';

import * as authControllers from '../controllers/auth.controllers.js';

const router: Router = Router();

router.post('/signup', authControllers.signUp); // register

router.post('/signin', authControllers.signIn); // login

router.post('/signout', authControllers.signOut); // logout

export default router;