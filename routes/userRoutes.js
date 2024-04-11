const express = require('express')
const User = require('../models/user')
const { generateToken, jwtAuthMiddleware } = require('../jwt')
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
        }

        const token = generateToken(payload)

        return res.json({ token })

    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
})

userRoutes.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId)
        return res.status(200).json({ user })
    } catch (err) {
        return res.status(501).json({ error: err })
    }
})

userRoutes.put('/profile/password', jwtAuthMiddleware, async (req, res) => {
    try {
        const { password } = req.body
        const userId = req.user.id
        // const user = await User.findByIdAndUpdate(userId, newPassword, {
        //     new: true,
        //     runValidators: true
        // })
        const user = await User.findById(userId)
        user.password = password
        await user.save()
        return res.status(200).json({ message: "Password updated successfully." })
    } catch (err) {
        console.log(err);
        return res.status(501).json({ error: err })
    }
})

module.exports = userRoutes