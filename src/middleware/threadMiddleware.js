const { body, param } = require("express-validator")

const validateCreateThread = [
    body("author")
        .notEmpty()
        .withMessage("Author must be present and can not be omitted from the request.")
        .isMongoId()
        .withMessage("ID must be a valid MongoDB ObjectId."),
    body("title")
        .notEmpty()
        .withMessage("Title must be present and can not be omitted from the request.")
        .isString()
        .withMessage("Title must be a string.")
        .isLength({ min: 3, max: 30 })
        .withMessage("Title must be between 3 and 30 characters long."),
    body("content")
        .notEmpty()
        .withMessage("Content must be present and can not be omitted from the request.")
        .isString()
        .withMessage("Content must be a string.")
        .isLength({ min: 1, max: 1500 })
        .withMessage("Content must be between 3 and 30 characters long."),
    body("likes")
        .notEmpty()
        .withMessage("Likes must be present and can not be omitted from the request.")
        .isNumeric()
        .withMessage("Likes must be a numeric value.")
        .isLength({ min: 1 })
        .withMessage("Likes must be at least 1 character long."),
    body("dislikes")
        .notEmpty()
        .withMessage("Dislikes must be present and can not be omitted from the request.")
        .isNumeric()
        .withMessage("Disikes must be a numeric value.")
        .isLength({ min: 1 })
        .withMessage("Disikes must be at least 1 character long.")
]

module.exports = {
    validateCreateThread
}