/* import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import * as userModels from "../models/user.models";
import { jwtSecret } from "../config/config";

const options: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: jwtSecret,
};

export default new Strategy(options, async (payload, done) => {
	try {
		const user = await userModels.getUserId(payload.id);
		console.log(payload.id)
		if (user) {
			return done(null, user);
		}
		return done(null, false);
	} catch (error) {
		console.log(error);
	}
});

import { config } from "dotenv";
config();

declare module 'jsonwebtoken' {
    export interface UserIDJwtPayload extends jwt.JwtPayload {
        userId: string
    }
}

export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/apicompany";
export const PORT = process.env.PORT || 4000;
export const SECRET = "yoursecretkey";

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@localhost";
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin"; */
