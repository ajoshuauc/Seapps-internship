const express = require('express')
const app = express()

//require express Router
const router = express.Router()

//controller functions
const { userSignup, userLogin } = require('../controllers/userController')

//login route
router.post('/login', userLogin)

//signup route
router.post('/signup', userSignup)

module.exports = router


