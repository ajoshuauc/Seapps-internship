const express = require('express')
const app = express()

// express Router
const router = express.Router()

//controller functions
const { employeeSignup, employeeLogin, employeeLogOut } = require('../controllers/employeeController')

//const {} = require('./userRoutes')

//signup route
router.post('/signup-employee', employeeSignup)

//login route
router.post('/login-employee', employeeLogin)

//logout route
router.get('/logout-employee', employeeLogOut)

module.exports = router