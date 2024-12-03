const express = require("express")
const router = express.Router()
const { createCategory, deleteCategory, updateCategory, getCategories, getCategory } = require("../controllers/categoryController")
const { validateCreateCategory, validateDeleteCategory, validateUpdateCategory, validateGetCategories, validateGetCategory } = require("../middleware/categoryMiddleware")
const { validateRequest } = require("../middleware/globalMiddleware")

router.post("/", [validateCreateCategory, validateRequest], createCategory)
router.delete("/:id", [validateDeleteCategory, validateRequest], deleteCategory)
router.patch("/:id", [validateUpdateCategory, validateRequest], updateCategory)
router.get("/", [validateGetCategories, validateRequest], getCategories)
router.get("/:id", [validateGetCategory, validateRequest], getCategory)

module.exports = router