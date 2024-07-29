const Employee = require('../models/employee')
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

//employee signup, redirect to employee
const employeeSignup = async (req, res) => {
    //get employee details
    // const userInfo = { email: req.body.email, password: req.body.password }
    // const employeeInfo = { firstName: req.body.firstName, lastName: req.body.lastName, mobilePhone: req.body.mobilePhone }
    const { email, password, firstName, lastName, suffix, mobilePhone } = req.body

    const userInfo = { email, password }
    const employeeInfo = {firstName, lastName, suffix, mobilePhone}

    try {
        const employee = await Employee.signup(userInfo, employeeInfo)
        //create token
        const token = createToken(employee._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })

        //json response
        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


//login employee
const employeeLogin = async (req, res) => {
    //get user details
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        //create token
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        //json response
        res.status(200).json({ email, token })
     } catch (error) {
        res.status(400).json({ error: error.message })
     }
}

const employeeLogOut = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('login')
}

module.exports = { employeeSignup, employeeLogin, employeeLogOut }