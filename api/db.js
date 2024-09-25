const mongo = require('mongoose')
require('dotenv').config()

const connection = mongo.connect(process.env.mongoDbURL)

const db = mongo.connection;

db.on('error', (err) => {
    console.log(err);
})

db.on('connected', () => {
    console.log("Connected to mongoDB.");
})

db.on('disconnected', () => {
    console.log("Disconnected to mongoDB.");
})

module.exports = db