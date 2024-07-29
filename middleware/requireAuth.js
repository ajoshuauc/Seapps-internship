const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Admin = require('../models/admin')
const Employee = require('../models/employee')

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        res.redirect('/login') // redirect to to login page
        return res.status(400).js({ error: 'Authorization token required' })
    }

    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET)
 
            req.user = await User.findOne({ _id }).select(' _id')
            
        
        next()
    } catch (error) {
        res.redirect('/login') // redirecto signup
        res.status(401).json({ error: 'Request is not authoriazed' })
    }
}

module.exports = requireAuth