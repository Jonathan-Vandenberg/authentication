import express from 'express'
import cors from 'cors'
import { readdirSync } from 'fs'
const morgan = require('morgan') // Dev tool showing post, route, status
require('dotenv').config()
import mongoose from 'mongoose'

// create express app
const app = express()

// apply middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
// Custom middleware
app.use((req, res, next) => {
  console.log('This is my custom middleware')
  next()
})

// Database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connected'))
  .catch((err) => console.log('Connection error:', err))

// routes
readdirSync('./routes').map((route) => {
  app.use('/api', require(`./routes/${route}`))
})

// port
const PORT = process.env.PORT || 8000

// listen
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`)
})
