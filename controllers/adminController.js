const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

//user signup
const adminSignup = async (req, res) => {
    //get admin details
    const {name, email, password} = req.body

    try {
        const user = await Admin.signup(name, email, password)
        //create token
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })

        //json response
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//login user
const adminLogin = async (req, res) => {
    //get admin details
    const {email, password} = req.body

    try {
        const user = await Admin.login(email, password)

        //create token
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })

        //json response
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const adminLogOut = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('login')
}

module.exports = {
    adminSignup,
    adminLogin,
    adminLogOut
}