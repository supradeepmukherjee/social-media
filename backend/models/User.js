const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"]
    },
    chavi: {
        public_id: String,
        url: String
    },
    email: {
        type: String,
        required: [true, "Please enter a email"],
        unique: [true, 'Email already exists']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minLength: [true, 'Password must be atleast 6 characters long'],
        select: false
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
})

userSchema.pre('save', async function (next) {
    console.log(this);
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateToken = async function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET)
}
userSchema.methods.getResetPasswordToken = async function () {
    const resetToken = crypto.randomBytes(20).toString('hex')
    console.log(resetToken)
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.resetPasswordExpiry = Date.now() + 600000
    return resetToken
}

module.exports = mongoose.model('User', userSchema)