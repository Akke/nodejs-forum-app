const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET

const signAuth = async (req, res) => {
    const { username, password } = req.body

    try {
        const findUser = await User.findOne({ username: username })
        if(!findUser) {
            return res.status(404).json({ messages: [`Could not find user ${username}.`] })
        }

        const compare = await bcrypt.compare(password, findUser.password)
        if(!compare) {
            return res.status(401).json({ messages: [`Incorrect password for user ${username}.`] })
        }

        const token = jwt.sign({
            id: findUser._id, username: findUser.username
        }, JWT_SECRET, { expiresIn: "1h" })

        res.status(200).json({ token })
    } catch(error) {
        // other server error
        console.log(error)
        res.status(500).send("Server Error")
    }
}

const getAuth = async (req, res) => {
    const { token } = req.params

    try {
        res.status(200).json(req.user)
    } catch(error) {
        // other server error
        console.log(error)
        res.status(500).send("Server Error")
    }
}

module.exports = {
    signAuth,
    getAuth
}