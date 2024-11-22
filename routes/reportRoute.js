const express = require("express")
const generateReport = require("../controllers/reportController")
const authorize = require("../middlewares/auth")
const router = express.Router()

router.post("/report", authorize, generateReport)

module.exports = router
