const router = require('express').Router()
const { Player, validate } = require('../models/player-model')
const bcrypt = require('bcrypt')

router.route('/signup').post(async(req, res) => {
    try {
        
        const { error } = validate(req.body)
        if(error) {
            console.log("Error Occured!", error.details[0].message)
            return res.status(400).json({message: "Error Occured!", error: error.details[0].message})
        }

        const player = await Player.findOne({ email: req.body.email })
        if(player) {
            return res.status(400).json({message: "User With This Email Already Exists!"})
        }

        const saltpassword = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(req.body.password, saltpassword)

        await new Player({...req.body, password: hashpassword}).save()
        return res.status(200).json({message: "New Player Registered!"})

    } catch (error) {
        console.log("Failed To Register Player!", error.message)
        return res.status(500).json({message: "Failed To Register Player!", error: error.message})
    }
})

module.exports = router