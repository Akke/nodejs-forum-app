const { body } = require("express-validator")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET

const validateAuthSign = [
    body("username")
        .notEmpty()
        .withMessage("Username must be present and can not be omitted from the request.")
        .isAlphanumeric()
        .withMessage("Username must be an alphanumerical value.")
        .isLength({ min: 3, max: 15 })
        .withMessage("Username must contain between 3 and 15 alphanumerical characters."),
    body("password")
        .notEmpty()
        .withMessage("Password must be present and can not be omitted from the request.")
        .isString()
        .withMessage("Password must be a string.")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long.")
]

const verifyAuth = async (req, res) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ messages: [`Authorization token missing or invalid.`] })
    }

    const token = authHeader.split(" ")[1]

    try {
        const verifyToken = jwt.verify(token, JWT_SECRET)
        req.user = verifyToken
        next()
    } catch(error) {
        console.log(error)
        return res.status(401).json({ messages: [`Authorization token invalid or expired.`] })
    }
}

module.exports = {
    validateAuthSign,
    verifyAuth
}