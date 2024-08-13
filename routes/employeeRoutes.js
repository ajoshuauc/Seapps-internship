const express = require('express')
const app = express()

// express Router
const router = express.Router()

//controller functions
const { employeeGetSignup, employeeGetLogin, employeeSignup, employeeLogin, employeeLogOut } = require('../controllers/employeeController')

//const {} = require('./userRoutes')

//signup route
router.get('/employee/signup', employeeGetSignup)
router.post('/employee/signup', employeeSignup)

//login route
router.get('/employee/login', employeeGetLogin)
router.post('/employee/login', employeeLogin)

//logout route
//router.get('/logout', logOut)

module.exports = router