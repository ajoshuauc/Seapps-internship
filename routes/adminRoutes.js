const express = require('express')
const app = express()

// require express Router
const router = express.Router()

//controller functions
const { adminSignup, adminLogin } = require('../controllers/adminController')

//login route
router.post('/login', adminLogin)

//signup route
router.post('/signup', adminSignup)


module.exports = router