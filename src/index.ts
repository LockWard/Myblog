import express from 'express';
import passport from 'passport';
import passportMiddleware from './middlewares/passport.js';
import bodyParser from 'body-parser';
import helmet from 'helmet';

// Routes
import auth_Routes from './routes/auth.routes.js';
import user_Routes from './routes/user.routes.js';
import follower from './routes/follower.routes.js';
import post_Routes from './routes/post.routes.js';
import post_vote_Routes from './routes/post_vote.routes.js';
import comment_Routes from './routes/comment.routes.js';
import comment_vote_Routes from './routes/comment_vote.routes.js';

const app = express();// The main app
// const admin = express()// The admin app

// Middleware - This transform the req.body to json
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

// Routes
app.use('/api/hello-world', (_req, res) => {res.send('Hello World!')}); // OK

app.use('/api/auth', auth_Routes);
app.use('/api/user', user_Routes);
app.use('/api/follower', follower);
app.use('/api/post', post_Routes);
app.use('/api/post_vote', post_vote_Routes);
app.use('/api/comment', comment_Routes);
app.use('/api/comment_vote', comment_vote_Routes);

export default app;