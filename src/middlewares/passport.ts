import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'

import User from '../models/user.models.js'
import { JWT_SECRET } from '../config/config.js'

const options: StrategyOptions = {

	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: JWT_SECRET,

}

export default new Strategy(options, async (payload, done) => {
	try {

		const result = await User.findByPk(payload.user_id)

		console.log(payload.user_id)

		if (result) {

			return done(null, result)

		}

		return done(null, false)

	} catch (error) {

		console.log(error)

	}
})