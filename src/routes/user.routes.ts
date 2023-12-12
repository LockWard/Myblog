import { Router } from 'express';
// import passport from "passport";

import * as userControllers from '../controllers/user.controllers.js';

const router: Router = Router()

router.get('/', userControllers.getAllUsers)

router.get('/:user_id', userControllers.getUserById)

router.post('/', userControllers.postUser)

router.put('/:user_id', userControllers.putUser)

router.delete(':user_id', userControllers.deleteUser)

// router.get(
//     "/special",
//     passport.authenticate("jwt", { session: false }),
//     special
//   );

export default router