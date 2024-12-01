const { body } = require("express-validator")

const validateCreateUser = [
    body("username")
        .isAlphanumeric()
        .isLength({ min: 3, max: 15 })
        .withMessage("Username must contain between 3 and 15 alphanumerical characters."),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long.")
]

module.exports = {
    validateCreateUser
}