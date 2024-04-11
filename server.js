const express = require('express')
const app = express()
const db = require('./db')

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const userRoutes = require('./routes/userRoutes')
const candidateRoutes = require('./routes/candidateRoutes')

app.get('/', (req, res) => {
    res.send("Welcome to voting application.")
})

app.use('/', userRoutes)
app.use('/candidate', candidateRoutes)

app.listen(3000, () => console.log("Listening on port 3000..."))