import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';

import { JWT_SECRET } from '../config/config.js';
import User from '../models/user.models.js';

const options: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: JWT_SECRET
}

export default new Strategy(options, async (payload, done) => {
	try {
		
		const result = await User.findByPk(payload.id);

		if (result) {
			return done(null, result);
		}

		return done(null, false);

	} catch (error) {

		console.log(error);

	}
});
