const express = require("express")
const router = express.Router()
const { createUser, deleteUser, updateUser, getUser, getUsers } = require("../controllers/userController")
const { validateCreateUser, validateDeleteUser, validateUpdateUser, validateGetUser, validateGetUsers } = require("../middleware/userMiddleware")
const { validateRequest } = require("../middleware/globalMiddleware")
const { verifyAuth } = require("../middleware/authMiddleware")

router.post("/", [validateCreateUser, validateRequest], createUser)
router.delete("/:id", [verifyAuth, validateDeleteUser, validateRequest], deleteUser)
router.patch("/:id", [verifyAuth, validateUpdateUser, validateRequest], updateUser)
router.get("/", [validateGetUsers, validateRequest], getUsers)
router.get("/:id", [validateGetUser, validateRequest], getUser)

module.exports = router