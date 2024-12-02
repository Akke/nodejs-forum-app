const express = require("express")
const router = express.Router()
const { createThread } = require("../controllers/threadController")
const { validateCreateThread } = require("../middleware/threadMiddleware")
const { validateRequest } = require("../middleware/globalMiddleware")

router.post("/", [validateCreateThread, validateRequest], createThread)
//router.delete("/:id", [validateDeleteThread, validateRequest], deleteThread)
//router.patch("/:id", [validateUpdateThread, validateRequest], updateThread)
//router.get("/:id", [validateGetThread, validateRequest], getThread)

module.exports = router