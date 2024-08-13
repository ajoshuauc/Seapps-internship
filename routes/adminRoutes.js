const express = require('express')
const app = express()
const { requireAuth } = require('../middleware/authentication')

// require express Router
const router = express.Router()

//controller functions
const { adminGetLogin, adminDashboard, adminSignup, adminLogin, adminLogOut } = require('../controllers/adminController')

//login routes
router.get('/admin/login', adminGetLogin)
router.post('/admin/login', adminLogin)

//admin dashboard
router.get('/admin/dashboard', requireAuth, adminDashboard)

//logout route
//router.get('/logout', adminLogOut)

module.exports = router