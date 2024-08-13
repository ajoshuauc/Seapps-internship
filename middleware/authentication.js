// const jwt = require('jsonwebtoken')
// const User = require('../models/user')
// const Admin = require('../models/admin')
// const Employee = require('../models/employee')

// const requireAuth = async (req, res, next) => {
//     const { authorization } = req.headers

//     if (!authorization) {
//         res.redirect('/login') // redirect to to login page
//         return res.status(400).js({ error: 'Authorization token required' })
//     }

//     const token = authorization.split(' ')[1]

//     try {
//         const { _id } = jwt.verify(token, process.env.SECRET)
 
//             req.user = await User.findOne({ _id }).select(' _id')
            
        
//         next()
//     } catch (error) {
//         res.redirect('/login') // redirecto signup
//         res.status(401).json({ error: 'Request is not authoriazed' })
//     }
// }

// module.exports = requireAuth

require('dotenv').config()

const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Admin = require('../models/admin')
const Employee = require('../models/employee')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
  
    // check json web token exists & is verified
    if (token) {
      jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.clearCookie('jwt'); // Clear the invalid token
          return res.redirect('/user/login')
        } else {
          console.log(decodedToken)

          // Set no-cache headers
          res.setHeader('Cache-Control', 'no-cache, no-store')
          next()
        }
      })
    } else {
      res.redirect('/user/login')
    }n
}
  

// check current user   
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.locals.user = null
                next()
            } else {
                console.log(decodedToken)
                let user = await User.findById(decodedToken._id)
                let admin = await Admin.findById(decodedToken._id)
                let employee = await Employee.findById(decodedToken._id)
                
                res.locals.user = user || admin || employee
                req.body.userId = user._id || admin._id || employee._id
                next()
            }
        })
    } 
    else {
        res.locals.user = null
        next()
    }
}

module.exports = { requireAuth, checkUser }