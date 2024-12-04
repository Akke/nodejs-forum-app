const { body, param, query } = require("express-validator")

const validateCreateThread = [
    body("author")
        .notEmpty()
        .withMessage("Author must be present and can not be omitted from the request.")
        .isMongoId()
        .withMessage("ID must be a valid MongoDB ObjectId."),
    body("category")
        .notEmpty()
        .withMessage("Category must be present and can not be omitted from the request.")
        .isMongoId()
        .withMessage("Category must be a valid MongoDB ObjectId."),
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
        .isInt({ min: 0 })
        .withMessage("Likes must be at least 0 or higher."),
    body("dislikes")
        .notEmpty()
        .withMessage("Dislikes must be present and can not be omitted from the request.")
        .isInt({ min: 0 })
        .withMessage("Disikes must be at least 0 or higher.")
]

const validateDeleteThread = [
    param("id")
        .isMongoId()
        .withMessage("ID must be a valid MongoDB ObjectId.")
]

const validateUpdateThread = [
    body("title")
        .optional()
        .isString()
        .withMessage("Title must be a string.")
        .isLength({ min: 3, max: 30 })
        .withMessage("Title must be between 3 and 30 characters long."),
    body("content")
        .optional()
        .isString()
        .withMessage("Content must be a string.")
        .isLength({ min: 1, max: 1500 })
        .withMessage("Content must be between 3 and 30 characters long."),
    body("likes")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Likes must be at least 0 or higher."),
    body("dislikes")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Dislikes must be at least 0 or higher."),
    body("category")
        .optional()
        .isMongoId()
        .withMessage("Category must be a valid MongoDB ObjectId."),
]

const validateGetThread = [
    param("id")
        .isMongoId()
        .withMessage("ID must be a valid MongoDB ObjectId.")
]

const validateGetThreads = [
    query("limit")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Limit must be at least 1 or higher."),
    query("skip")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Skip must be at least 0 or higher."),
    query("category")
        .optional()
        .isMongoId()
        .withMessage("Category must be a valid MongoDB ObjectId."),
    query("sortOrder")
        .optional()
        .isIn([-1, 1])
        .withMessage("SortOrder must be either -1 or 1")
]

module.exports = {
    validateCreateThread,
    validateDeleteThread,
    validateUpdateThread,
    validateGetThread,
    validateGetThreads
}