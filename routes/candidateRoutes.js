const express = require('express')
const Candidate = require('../models/candidate')
const User = require('../models/user')
const { jwtAuthMiddleware } = require('../jwt')
const candidateRoutes = express.Router()

const checkAdminRole = async (userId) => {

    const user = await User.findById(userId)
    if (user.role === "admin") {
        return true
    } else {
        return false
    }
}

candidateRoutes.post('/', jwtAuthMiddleware, async (req, res) => {
    try {

        if (!(await checkAdminRole(req.user.id))) {
            return res.status(403).json({ message: "User does not have admin role." })
        }

        const candidate = new Candidate(req.body)
        const response = await candidate.save()
        res.status(200).json({ message: "Candidate created successfully." })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err })
    }
})

candidateRoutes.put('/:candidateId', jwtAuthMiddleware, async (req, res) => {
    try {

        if (!(await checkAdminRole(req.user.id))) {
            return res.status(403).json({ message: "User does not have admin role." })
        }

        const candidateId = req.params.candidateId
        const updatedCandidateData = req.body
        const response = await Candidate.findByIdAndUpdate(candidateId, updatedCandidateData, {
            new: true,
            runValidators: true
        })

        if (!response) {
            return res.status(404).json({ message: "Candidate not found!" })
        }

        return res.status(200).json({ message: "Candidate data updated successfully." })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err })
    }
})

candidateRoutes.delete('/:candidateId', jwtAuthMiddleware, async (req, res) => {
    try {
        if (!(await checkAdminRole(req.user.id))) {
            return res.status(403).json({ message: "User does not have admin role." })
        }

        const candidateId = req.params.candidateId

        const response = await Candidate.findByIdAndDelete(candidateId)
        if (!response) {
            return res.status(404).json({ message: "Candidate not found!" })
        }

        return res.status(200).json({ message: "Candidate deleted." })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err })
    }
})

candidateRoutes.get('/', async (req, res) => {
    try {
        const candidates = await Candidate.find({}, 'name party -_id')
        return res.status(200).json(candidates)
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err })
    }
})

candidateRoutes.post('/vote/:candidateId', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id
        const candidateId = req.params.candidateId

        const candidate = await Candidate.findById(candidateId)
        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found!" })
        }

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found!" })
        }

        if (user.role === 'admin') {
            return res.status(403).json({ message: "Admin is not allowed to vote." })
        }

        if (user.isVoted) {
            return res.status(400).json({ message: "You have already voted!" })
        }

        candidate.votes.push({ user: userId })
        candidate.voteCount++
        await candidate.save()

        user.isVoted = true
        await user.save()

        return res.status(200).json({ message: "Vote recorded successfully." })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err })
    }
})

candidateRoutes.get('/vote/counts', async (req, res) => {
    try {
        const candidates = await Candidate.find().sort({ voteCount: 'desc' })
        const voteRecords = candidates.map((data) => {
            return {
                party: data.party,
                voteCount: data.voteCount
            }
        })

        return res.status(200).json(voteRecords)
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err })
    }
})

module.exports = candidateRoutes