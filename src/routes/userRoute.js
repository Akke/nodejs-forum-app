const express = require("express")
const router = express.Router()
const { createUser, deleteUser } = require("../controllers/userController")
const { validateCreateUser, validateDeleteUser } = require("../middleware/userMiddleware")
const { validateRequest } = require("../middleware/globalMiddleware")

router.post("/", [validateCreateUser, validateRequest], createUser)
router.delete("/", [validateDeleteUser, validateRequest], deleteUser)

module.exports = router