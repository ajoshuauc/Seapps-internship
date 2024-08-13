const express = require('express')
const app = express()

//require express Router
const router = express.Router()

//controller functions
const { userGetSignup, userGetLogin, userSignup, userLogin, logOut } = require('../controllers/userController')

//signup routes
router.get('/user/signup', userGetSignup)
router.post('/user/signup', userSignup)

//login routes
router.get('/user/login', userGetLogin)
router.post('/user/login', userLogin)

//logout route
router.get('/logout', logOut)

module.exports = router


