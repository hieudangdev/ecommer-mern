import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoute.js'

const app = express()

// config dotenv-
dotenv.config()

// database config
connectDB()

// middleware
app.use(express.json())
app.use(morgan('dev'))

// routes
app.use('/api/auth', authRoutes)

// rest api
app.get('/', (req, res) => {
   res.send({
      message: 'Welcome to my ecommer-mern',
   })
})

const POST = process.env.PORT || 4000

app.listen(POST, () => {
   console.log(`server Running on ${POST} `)
})
