const express = require('express')
const User = require('../models/user')
const { generateToken } = require('../jwt')
const userRoutes = express.Router()

userRoutes.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body)
        const response = await user.save()

        return res.status(200).json({ message: "Account created successfully." })

    } catch (err) {
        return res.status(500).json({ error: err })
    }
})

userRoutes.post('/signin', async (req, res) => {
    try {
        const { aadharNo, password } = req.body
        const response = await User.findOne({ aadharNo })
        if (!response || !(await response.comparePassword(password))) {
            return res.status(401).json({ error: "Invalid aadhar no or password!" })
        }

        const payload = {
            id: response.id,
            name: response.name
        }

        const token = generateToken(payload)

        return res.json({ token })

    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
})

module.exports = userRoutes