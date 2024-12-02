const express = require("express")
const router = express.Router()
const { createThread, deleteThread, updateThread, getThread, getThreads } = require("../controllers/threadController")
const { validateCreateThread, validateDeleteThread, validateUpdateThread, validateGetThread, validateGetThreads } = require("../middleware/threadMiddleware")
const { validateRequest } = require("../middleware/globalMiddleware")

router.post("/", [validateCreateThread, validateRequest], createThread)
router.delete("/:id", [validateDeleteThread, validateRequest], deleteThread)
router.patch("/:id", [validateUpdateThread, validateRequest], updateThread)
router.get("/", [validateGetThreads, validateRequest], getThreads)
router.get("/:id", [validateGetThread, validateRequest], getThread)

module.exports = router