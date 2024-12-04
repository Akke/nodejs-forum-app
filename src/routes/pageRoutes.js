const express = require("express")
const router = express.Router()
const path = require("path")

router.get("/", (req, res) => {
    return res.sendFile(path.join(__dirname, "../../public/index.html"))
})

router.get("/login", (req, res) => {
    return res.sendFile(path.join(__dirname, "../../public/login.html"))
})

router.get("/logout", (req, res) => {
    return res.sendFile(path.join(__dirname, "../../public/logout.html"))
})

router.get("/register", (req, res) => {
    return res.sendFile(path.join(__dirname, "../../public/register.html"))
})

// /new must come before /:id or it won't be accessible
router.get("/category/new", (req, res) => {
    return res.sendFile(path.join(__dirname, "../../public/category_new.html"))
})

router.get("/category/:id", (req, res) => {
    return res.sendFile(path.join(__dirname, "../../public/category.html"))
})

router.get("/category/:id/edit", (req, res) => {
    return res.sendFile(path.join(__dirname, "../../public/category_edit.html"))
})

// /new must come before /:id or it won't be accessible
router.get("/threads/new", (req, res) => {
    return res.sendFile(path.join(__dirname, "../../public/thread_new.html"))
})

router.get("/threads/:id", (req, res) => {
    return res.sendFile(path.join(__dirname, "../../public/thread.html"))
})

router.get("/members", (req, res) => {
    return res.sendFile(path.join(__dirname, "../../public/members.html"))
})

router.get("/404", (req, res) => {
    return res.sendFile(path.join(__dirname, "../../public/404.html"))
})

router.get("/account", (req, res) => {
    return res.sendFile(path.join(__dirname, "../../public/account_settings.html"))
})

module.exports = router