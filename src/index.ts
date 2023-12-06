import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'

// Routes
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
// import feedRoutes from './routes/feed.routes.js'
import postRoutes from './routes/post.routes.js'
import commentRoutes from './routes/comment.routes.js'
import voteRoutes from './routes/vote.routes.js'

const app = express()// The main app
// const admin = express()// The admin app

// Middleware - This transform the req.body to json
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

// Routes
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
// app.use('/api/feed', feedRoutes)
app.use('/api/post', postRoutes)
app.use('/api/comment', commentRoutes)
app.use('/api/vote', voteRoutes)

export default app