const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://127.0.0.1/forum`)
        console.log("Successfully connected to the database.")
    } catch (error) {
        console.log("There was an error connecting to the database", error.message)
        throw new Error("Failed to connect to the database.")
    }
}

module.exports = connectDB