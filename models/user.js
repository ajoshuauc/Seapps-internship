const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true })

//static signup method
userSchema.statics.signup = async function (name, email, password) {
    
    // Collect missing fields
    let missingFields = [];
    if (!name) missingFields.push('Name');
    if (!email) missingFields.push('Email');
    if (!password) missingFields.push('Password');

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
        throw new Error('Email already exists');
    }

    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create user
    const user = await this.create({ name, email, password: hash });

    return user;
}


userSchema.statics.login = async function (email, password) {
    //validation
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    //find if email exists
    const user = await this.findOne({email})
    if (!user) {
        throw Error('incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('incorrect password')
    }

    return user
}

module.exports = mongoose.model('user', userSchema)