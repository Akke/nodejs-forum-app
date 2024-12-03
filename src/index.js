const express = require("express")
const path = require("path")
require("dotenv").config()

// Connect to our database
const connectDB = require("./db/connect")

const app = express()
const PORT = process.env.APP_PORT

connectDB()

app.use(express.json())
app.use(express.static("../public"))

// Import our routes
const authRoute = require("./routes/authRoutes")
const userRoute = require("./routes/userRoutes")
const threadRoute = require("./routes/threadRoutes")

// Set up our routes
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/thread", threadRoute)

app.get("/", (req, res) => {
    return res.sendFile(path.join(__dirname, "../public/index.html"))
})

// Start our application
app.listen(PORT, () => {
    console.log(`Application running and listening on port ${PORT}.`)
})
