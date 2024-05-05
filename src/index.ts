import express from 'express';
import passport from 'passport';
import passportMiddleware from './middlewares/passport.js';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';

// Routes
import routes from './routes/routes.js';

const app = express();// The main app
// const admin = express()// The admin app

// Middlewares
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

// Routes
app.use('/', routes);

// Static files
app.use(express.static('public')); 

export default app;