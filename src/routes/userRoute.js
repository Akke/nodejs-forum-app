const express = require("express")
const router = express.Router()
const { createUser, deleteUser, updateUser, getUser } = require("../controllers/userController")
const { validateCreateUser, validateDeleteUser, validateUpdateUser, validateGetUser } = require("../middleware/userMiddleware")
const { validateRequest } = require("../middleware/globalMiddleware")

router.post("/", [validateCreateUser, validateRequest], createUser)
router.delete("/:id", [validateDeleteUser, validateRequest], deleteUser)
router.patch("/:id", [validateUpdateUser, validateRequest], updateUser)
router.get("/:id", [validateGetUser, validateRequest], getUser)

module.exports = router