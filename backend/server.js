require('dotenv').config()
const cors = require('cors')

const express = require('express')
const workoutsRouter = require('./routes/workouts')
const { default: mongoose } = require('mongoose')
const userRouter = require('./routes/user')

//express app
const app = express()

//middleware
app.use(cors()) // allows requests from any origin
app.use(express.json()) // parse incoming json data - checks if request has json data and parses it into javascript object
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', workoutsRouter) // use workoutsRouter for all routes starting with /api/workouts
app.use('/api/user', userRouter)

// connect to db - async in nature
mongoose.connect(process.env.MONG_URI, {})
    .then(() => {
        console.log('Connected to db')
        // listen for request once connected to db
        app.listen(process.env.PORT, () => {
            console.log('Server is listening on port', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })

