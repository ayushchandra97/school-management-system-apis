const express = require("express")
const {
  createExam,
  getAllExams,
  updateExam,
  deleteExam,
} = require("../controllers/examController")
const authorize = require("../middlewares/auth")
const router = express.Router()

router.post("/create", authorize, createExam)
router.get("/get-all-exams", authorize, getAllExams)
router.put("/update", authorize, updateExam)
router.delete("/delete", authorize, deleteExam)

module.exports = router
