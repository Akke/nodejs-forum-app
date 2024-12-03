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
const categoryRoute = require("./routes/categoryRoutes")

// Set up our routes
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/thread", threadRoute)
app.use("/api/category", categoryRoute)

app.get("/", (req, res) => {
    return res.sendFile(path.join(__dirname, "../public/index.html"))
})

app.get("/login", (req, res) => {
    console.log(req.user)
    return res.sendFile(path.join(__dirname, "../public/login.html"))
})

// Start our application
app.listen(PORT, () => {
    console.log(`Application running and listening on port ${PORT}.`)
})
