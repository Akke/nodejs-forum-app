const { body, param } = require("express-validator")

const validateCreateThread = [
    body("author")
        .isMongoId()
        .withMessage("ID must be a valid MongoDB ObjectId."),
        body("title")
        .isString()
        .isLength({ min: 3, max: 30 }),
    body("content")
        .isString()
        .isLength({ min: 1, max: 1500 }),
    body("likes")
        .isNumeric()
        .isLength({ min: 1 }),
    body("dislikes")
        .isNumeric()
        .isLength({ min: 1 })
]

module.exports = {
    validateCreateThread
}