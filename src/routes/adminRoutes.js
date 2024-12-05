const express = require("express")
const router = express.Router()
const { adminGetUser } = require("../controllers/adminController")
const { validateAdminGetUser } = require("../middleware/adminMiddleware")
const { validateRequest } = require("../middleware/globalMiddleware")
const { verifyAuth } = require("../middleware/authMiddleware")

router.get("/user/:id", [verifyAuth, validateAdminGetUser, validateRequest], adminGetUser)

module.exports = router