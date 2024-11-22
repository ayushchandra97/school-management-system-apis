const express = require("express")
const { createAdmin, loginAsAdmin } = require("../controllers/adminController")
const router = express.Router()

router.post("/create-admin", createAdmin)

router.post("/admin-login", loginAsAdmin)

module.exports = router
