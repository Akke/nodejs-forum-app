const express = require("express")
const router = express.Router()
const { createUser } = require("../controllers/userController")
const { validateCreateUser } = require("../middleware/userMiddleware")
const { validateRequest } = require("../middleware/globalMiddleware")

router.post("/", [validateCreateUser, validateRequest], createUser)

module.exports = router