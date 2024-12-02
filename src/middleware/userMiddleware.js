const { body, param } = require("express-validator")

const validateCreateUser = [
    body("username")
        .isAlphanumeric()
        .isLength({ min: 3, max: 15 })
        .withMessage("Username must contain between 3 and 15 alphanumerical characters."),
    body("password")
        .isString()
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long.")
]

const validateDeleteUser = [
    param("id")
        .isMongoId()
        .withMessage("ID must be a valid MongoDB ObjectId.")
]

const validateUpdateUser = [
    param("id")
        .isMongoId()
        .withMessage("ID must be a valid MongoDB ObjectId."),
    body("password")
        .isString()
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long.")
]

const validateGetUser = [
    param("id")
        .isMongoId()
        .withMessage("ID must be a valid MongoDB ObjectId.")
]

module.exports = {
    validateCreateUser,
    validateDeleteUser,
    validateUpdateUser,
    validateGetUser
}