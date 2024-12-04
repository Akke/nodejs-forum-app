const { body, param, query } = require("express-validator")

const validateCreateUser = [
    body("username")
        .notEmpty()
        .withMessage("Username must be present and can not be omitted from the request.")
        .isAlphanumeric()
        .withMessage("Username must be an alphanumeric value.")
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
        .withMessage("Password must be a string.")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long.")
]

const validateGetUser = [
    param("id")
        .isMongoId()
        .withMessage("ID must be a valid MongoDB ObjectId.")
]

const validateGetUsers = [
    query("limit")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Limit must be at least 1 or higher."),
    query("skip")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Skip must be at least 0 or higher.")
]

module.exports = {
    validateCreateUser,
    validateDeleteUser,
    validateUpdateUser,
    validateGetUser,
    validateGetUsers
}