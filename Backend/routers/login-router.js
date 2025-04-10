const router = require('express').Router()
const { Player, validate } = require('../models/player-model')
const bcrypt = require('bcrypt')
const rateLimiter = require('express-rate-limit')
const joi = require('joi')

// Limit the Login Attempts!
const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too Many Attempts. Try Again Later!"
})

router.route('/login').post(limiter, async(req, res) => {
    try {
        
        const { error } = validate(req.body)
        if(error) {
            console.log("Error Occured!", error.details[0].message)
            return res.status(400).json({message: "Error Occured!", error: error.details[0].message})
        }

        const player = await Player.findOne({ email: req.body.email })
        if(!player) {
            return res.status(400).json({message: "Invalid Email!"})
        }

        const comparepassword = await bcrypt.compare(req.body.password, player.password)
        if(!comparepassword) {
            return res.status(400).json({message: "Invalid Password!"})
        }

        const token = player.generateAuthToken()

        res.cookie('AuthToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 10 * 10 * 1000
        })

        return res.status(200).send({data: token, message: "Player LoggedIn!", redirectUrl: '/dashboard/'})


    } catch (error) {
        console.log("Failed To Login The Player!", error.message)
        return res.status(500).json({message: "Failed To Login The Player!", error: error.message})
    }
})

const validate = (data) => {
    const schema = joi.object({
        email: joi.string().email().required().label("Email"),
        password: joi.string().required().label("Password")
    })

    return schema.validate(data)
}

router.route('/logout').post(async(req, res) => {
    try {
        console.log(req.cookies)
        
        const token = req.cookies.AuthToken
        if(!token) {
            return res.status(400).json({message: "Token Not Found!"})
        }

        const jwtSecret = process.env.PRIVATEKEY
        const decodedToken = 
    } catch (error) {
        
    }
})

module.exports = router