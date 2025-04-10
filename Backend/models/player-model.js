const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const joi = require('joi')
const passwordComplexity = require('joi-password-complexity')

const signupSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

signupSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.PRIVATEKEY, {expiresIn: "1d"})
    return token
}

const Player = mongoose.model("Player", signupSchema) 

const validate = (data) => {
    const schema = joi.object({
        username: joi.string().required().label("username"),
        email: joi.string().email().required().label("email"),
        password: passwordComplexity().required().label("password")
    })
    
    return schema.validate(data)
}

module.exports = { Player, validate }