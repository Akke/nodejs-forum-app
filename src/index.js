const express = require("express")
require("dotenv").config()

const connectDB = require("./db/connect")

const app = express()

const PORT = process.env.APP_PORT

connectDB()

app.use(express.json())

app.listen(PORT, () => {
    console.log(`Application running and listening on port ${PORT}.`)
})
