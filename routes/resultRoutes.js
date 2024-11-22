const express = require("express")
const {
  createResult,
  getAllResults,
  updateResult,
  deleteResult,
} = require("../controllers/resultController")
const authorize = require("../middlewares/auth")
const router = express.Router()

router.post("/create", authorize, createResult)
router.get("/get-all-results", authorize, getAllResults)
router.put("/update", authorize, updateResult)
router.delete("/delete", authorize, deleteResult)

module.exports = router
