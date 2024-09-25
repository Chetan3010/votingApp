const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    aadharNo: {
        type: Number,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
    },
    email: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['voter', 'admin'],
        default: 'voter'
    },
    isVoted: {
        type: Boolean,
        default: false
    }
})

userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) return next()

    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    } catch (err) {
        // console.log(err);    
        return next(err)
    }
})

userSchema.methods.comparePassword = async function (password) {
    try {
        const isMatch = await bcrypt.compare(password, this.password)
        return isMatch
    } catch (err) {
        throw err
    }
}

const User = mongoose.model('user', userSchema, 'user')
module.exports = User