const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    suffix: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobilePhone: {
        type: String,
        required: true
    },
    
}, { timestamps: true })

// signup employee
employeeSchema.statics.signup = async function (userInfo, employeeInfo) {

    const { email, password } = userInfo
    const { firstName, lastName, suffix, mobilePhone } = employeeInfo

    // Collect missing fields
    let missingFields = [];
    if (!firstName) missingFields.push('First name');
    if (!lastName) missingFields.push('Last name');
    if (!mobilePhone) missingFields.push('Mobile phone');

    // If more than one field is missing, throw a generic error
    if (missingFields.length > 1) {
        throw new Error('All fields must be filled');
    }

    // If exactly one field is missing, throw a specific error
    if (missingFields.length === 1) {
        throw new Error(`${missingFields[0]} must be filled`);
    }

    // Email validation
    if (!validator.isEmail(email)) {
        throw new Error('Email not valid');
    }

    // Check if email already exists
    const exists = await this.findOne({ email });
    if (exists) {
        throw new Error('Account already exists');
    }

    // Check if mobile phone is valid
    if (!validator.isMobilePhone) {
        throw new Error('Mobile phone not valid')
    }

     // Generate salt and hash password
     const salt = await bcrypt.genSalt(10);
     const hash = await bcrypt.hash(password, salt);

    // Create user
    const employee = await this.create({ firstName, lastName, suffix, email, password, mobilePhone });

    return employee;
    
}

// employee login
employeeSchema.statics.login = async function (email, password) {
    //validation
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    //find if email exists
    const employee = await this.findOne({email})
    if (!employee) {
        throw Error('incorrect email')
    }

    const match = await bcrypt.compare(password, employee.password)
    if (!match) {
        throw Error('incorrect password')
    }

    return user
}

module.exports = mongoose.model('employee', employeeSchema)