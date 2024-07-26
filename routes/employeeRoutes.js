const express = require('express')
const app = express()

// express Router
const router = express.Router()

//controller functions
const { employeeSignup } = require('../controllers/employeeController')

//const {} = require('./userRoutes')

//signup route
router.post('/signup', employeeSignup)

module.exports = router