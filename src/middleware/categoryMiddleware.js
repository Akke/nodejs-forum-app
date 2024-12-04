const { body, param, query } = require("express-validator")

const validateCreateCategory = [
    body("name")
        .notEmpty()
        .withMessage("Name must be present and can not be omitted from the request.")
        .isString()
        .withMessage("Name must be a string.")
        .isLength({ min: 3, max: 30 })
        .withMessage("Name must be between 3 and 30 characters long."),
    body("displayIcon")
        .notEmpty()
        .withMessage("DisplayIcon must be present and can not be omitted from the request.")
        .isString()
        .withMessage("DisplayIcon must be a string.")
        .isLength({ min: 1, max: 10 })
        .withMessage("DisplayIcon must be between 1 and 10 characters long."),
    body("displayColor")
        .notEmpty()
        .withMessage("DisplayColor must be present and can not be omitted from the request.")
        .isString()
        .withMessage("DisplayColor must be a string.")
        .isLength({ min: 1, max: 30 })
        .withMessage("DisplayColor must be between 1 and 30 characters long."),
]

const validateDeleteCategory = [
    param("id")
        .isMongoId()
        .withMessage("ID must be a valid MongoDB ObjectId.")
]

const validateUpdateCategory = [
    body("name")
        .optional()
        .isString()
        .withMessage("Name must be a string.")
        .isLength({ min: 3, max: 30 })
        .withMessage("Name must be between 3 and 30 characters long."),
    body("displayIcon")
        .optional()
        .isString()
        .withMessage("DisplayIcon must be a string.")
        .isLength({ min: 1, max: 10 })
        .withMessage("DisplayIcon must be between 1 and 10 characters long."),
    body("displayColor")
        .optional()
        .isString()
        .withMessage("DisplayColor must be a string.")
        .isLength({ min: 1, max: 30 })
        .withMessage("DisplayColor must be between 1 and 30 characters long.")
]

const validateGetCategory = [
    param("id")
        .isMongoId()
        .withMessage("ID must be a valid MongoDB ObjectId.")
]

const validateGetCategories = [
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
    validateCreateCategory,
    validateDeleteCategory,
    validateUpdateCategory,
    validateGetCategories,
    validateGetCategory
}