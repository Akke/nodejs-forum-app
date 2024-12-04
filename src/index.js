const express = require("express")

require("dotenv").config()

// Connect to our database
const connectDB = require("./db/connect")

const app = express()
const PORT = process.env.APP_PORT

connectDB()

app.use(express.json())
app.use(express.static("../public"))

// Import our routes
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const threadRoutes = require("./routes/threadRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
const pageRoutes = require("./routes/pageRoutes")

// Set up our routes
// API Routes
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/thread", threadRoutes)
app.use("/api/category", categoryRoutes)

// Front-end page routes
app.use("/", pageRoutes)

// Start our application
app.listen(PORT, () => {
    console.log(`Application running and listening on port ${PORT}.`)
})
