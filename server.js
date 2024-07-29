//require env file
require('dotenv').config()

//require packages and routes
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const employeeRoutes = require('./routes/employeeRoutes')

//express app
const app = express()

//middleware
app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser())
const requireAuth = require('./middleware/requireAuth')

// view engine
app.set('view engine', 'ejs')

//routes
app.use(userRoutes) // signup and login of user
app.use(adminRoutes)// login of admin




//database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('listening on port', process.env.PORT)})
    })
    .catch((error) => {
        console.log(error)

        app.use((req, res) => {
            res.status(500).json({ error: error.message })
        })
    })