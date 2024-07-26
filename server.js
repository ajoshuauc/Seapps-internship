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

// view engine
app.set('view engine', 'ejs')

//routes
app.use('/user/login', userRoutes, (req, res) => res.render('login'))
app.use('/user/signup', userRoutes)
app.use('/admin/login', adminRoutes)
app.use('/admin/signup', adminRoutes)
app.use('/employee', employeeRoutes)

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