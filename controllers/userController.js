const user = require('../models/user')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

const userGetSignup = (req, res) => {
    res.render('userSignup')
}

const userGetLogin = (req, res) => {
    res.render('userLogin')
}

//user signup, redirect to employee
const userSignup = async (req, res) => {
    //get user details
    const { name, email, password } = req.body
    console.log(name, email, password)

    try {
        const user = await User.signup(name, email, password)
        //create token
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })

        //json response
        res.status(200).json({ email })
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
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })

        //json response
        res.status(200).json({ user: user._id })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
    
}
//log out
const logOut = (req, res) => {
   res.clearCookie('jwt')
    res.redirect('/user/login')
}

module.exports = {
    userGetSignup,
    userGetLogin,
    userSignup,
    userLogin,
    logOut
}