const jwt = require('jsonwebtoken')
const jwtSecretKey = process.env.JWTSECRETKEY

const jwtAuthMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization

    if (!authorization) return res.status(401).json({ error: "Token not found." })

    const token = authorization.split(" ")[1]
    if (!token) return res.status(401).json({ error: "Unauthorized" })

    try {
        const decodedPayload = jwt.verify(token, jwtSecretKey)
        req.user = decodedPayload
        next()

    } catch (err) {
        console.log(err);
        res.status(401).json(err)
    }
}

const generateToken = (payload) => {
    return jwt.sign(payload, jwtSecretKey)
}

module.exports = { jwtAuthMiddleware, generateToken }