const express = require("express")
const router = express.Router()
const { signAuth, getAuth } = require("../controllers/authController")
const { validateAuthSign, verifyAuth } = require("../middleware/authMiddleware")
const { validateRequest } = require("../middleware/globalMiddleware")

router.post("/sign", [validateAuthSign, validateRequest], signAuth)
router.get("/", [verifyAuth, validateRequest], getAuth)

module.exports = router