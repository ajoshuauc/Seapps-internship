const User = require('../models/user')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

//user signup, redirect to employee
const userSignup = async (req, res) => {
    //get user details
    const { name, email, password } = req.body

    try {
        const user = await User.signup(name, email, password)
        
        //create token
        const token = createToken(user._id)

        //json response
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//login user
const userLogin = async (req, res) => {
    //get user details
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        //create token
        const token = createToken(user._id)

        //json response
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    userSignup,
    userLogin,
}