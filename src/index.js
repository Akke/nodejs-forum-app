const express = require("express")
require("dotenv").config()

// Connect to our database
const connectDB = require("./db/connect")

const app = express()
const PORT = process.env.APP_PORT

connectDB()

app.use(express.json())

// Import our routes
const userRoute = require("./routes/userRoute")
const threadRoute = require("./routes/threadRoute")

// Set up our routes
app.use("/api/user", userRoute)
app.use("/api/thread", threadRoute)

// Start our application
app.listen(PORT, () => {
    console.log(`Application running and listening on port ${PORT}.`)
})
