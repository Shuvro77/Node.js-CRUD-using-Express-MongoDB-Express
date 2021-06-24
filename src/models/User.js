const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('../models/Task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Need a valid Email Address')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("Value need to be positive")
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        validate(value) {
            if (value.length < 4) {
                throw new Error("Password must contain at least 4 characters")
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.generateAuthToken = async function () {
    //console.log('generateAuthTokern')

    //console.log(token)

    try {
        const user = this
        const token = jwt.sign({ _id: user._id.toString() }, 'auth')
        user.tokens = user.tokens.concat({ token })
        const result = await user.save()
        return { result, token }
    } catch (error) {
        console.log("authToken ", error)
        throw new Error('Failed to create User')
    }
    //console.log(result,token)

}

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})


userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}



// extra functions
userSchema.statics.findByCredentials = async ({ email, password }) => {
    // console.log("findByCredentials ", email, password)

    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('login error')
    }
    const isOk = await bcrypt.compare(password, user.password)
    if (!isOk) {
        throw new Error('login error')
    }
    return user
}





userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

userSchema.pre('remove', async function (next) {
    console.log('pre remove')
    const user = this

    const result = await Task.deleteMany({owner: user._id})

    console.log('deleted', result)

    next()
})


const User = mongoose.model('User', userSchema)

module.exports = User