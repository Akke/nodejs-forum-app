const express = require("express")
const router = express.Router()
const { signAuth } = require("../controllers/authController")
const { validateAuthSign } = require("../middleware/authMiddleware")
const { validateRequest } = require("../middleware/globalMiddleware")

router.post("/sign", [validateAuthSign, validateRequest], signAuth)

module.exports = router