const { param } = require("express-validator")

const validateAdminGetUser = [
    param("id")
        .isMongoId()
        .withMessage("ID must be a valid MongoDB ObjectId.")
]

module.exports = {
    validateAdminGetUser
}