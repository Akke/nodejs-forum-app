const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
        console.log("Successfully connected to the database.")
    } catch (error) {
        console.log("There was an error connecting to the database", error.message)
        throw new Error("Failed to connect to the database.")
    }
}

module.exports = connectDB