const express = require('express')
const app = express()

//require express Router
const router = express.Router()

//controller functions
const { userSignup, userLogin, logOut } = require('../controllers/userController')

//login route
router.post('/login', userLogin)

//signup route
router.post('/signup', userSignup)

//logout route
router.get('/logout-user', logOut)

module.exports = router


