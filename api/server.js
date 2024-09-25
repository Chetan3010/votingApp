const express = require('express')
const app = express()
const db = require('../db')

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const userRoutes = require('../routes/userRoutes')
const candidateRoutes = require('../routes/candidateRoutes')

app.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to the Voting Application</h1>
        <h2>Available Endpoints:</h2>
        <ul>
            <li><strong>POST /signup</strong> - Create a new user account</li>
            <li><strong>POST /signin</strong> - Sign in and get a JWT token</li>
            <li><strong>GET /profile</strong> - Get user profile details (Requires JWT)</li>
            <li><strong>PUT /profile/password</strong> - Update user password (Requires JWT)</li>
            <li><strong>POST /</strong> - Create a new candidate (Admin only, Requires JWT)</li>
            <li><strong>PUT /:candidateId</strong> - Update candidate details (Admin only, Requires JWT)</li>
            <li><strong>DELETE /:candidateId</strong> - Delete a candidate (Admin only, Requires JWT)</li>
            <li><strong>GET /</strong> - Get list of all candidates (Public)</li>
            <li><strong>POST /vote/:candidateId</strong> - Vote for a candidate (Requires JWT)</li>
            <li><strong>GET /vote/counts</strong> - Get vote counts sorted by number of votes (Public)</li>
        </ul>
    `);
});

app.use('/', userRoutes)
app.use('/candidate', candidateRoutes)

app.listen(3000, () => console.log("Listening on port 3000..."))