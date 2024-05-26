const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

// Schema

const userSchema = new mongoose.Schema({
    'email': {
        type: String,
        required: true,
        unique: true
    },
    'password': {
        type: String,
        required: true
    },
}
);

// Static signup method
userSchema.statics.signup = async function (email, password) {

    // validate email and password
    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    // validate email
    if (!validator.isEmail(email)) {
        throw new Error('Email is invalid');
    }
    // check if email exists
    if (await this.exists({ email })) {
        throw new Error('Email already in use');
    }
    // validate password
    if (!validator.isStrongPassword(password)) {
        throw new Error('Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number and one special character');
    }



    // hash password
    const salt = await bcrypt.genSalt(10); // generate salt
    const hash = await bcrypt.hash(password, salt); // generate hash

    const user = await this.create({ email, password: hash }); // create new user
    return user;
}

// Static login method
userSchema.statics.login = async function (email, password) {

    // validate email and password
    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    // check if email exists
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('Email does not exist');
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid password');
    }

    return user;
}

module.exports = mongoose.model('User', userSchema);