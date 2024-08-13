//require env file
require('dotenv').config()

//require packages and routes
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const employeeRoutes = require('./routes/employeeRoutes')
const attendanceRoutes = require('./routes/attendanceRoutes')

//express app
const app = express()

//middleware
app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser())
//app.use(express.urlencoded({ extended: true }));
const { requireAuth, checkUser } = require('./middleware/authentication')

// view engine
app.set('view engine', 'ejs')

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

//routes
app.get('*', checkUser)
app.get('/', requireAuth, (req, res) => res.render('dashboard'));
app.use(userRoutes) // signup and login of user
app.use(adminRoutes)// login of admin
app.use(employeeRoutes)
app.use(attendanceRoutes)
//app.get('/user/signup', (req, res) => res.render('userSignup'))