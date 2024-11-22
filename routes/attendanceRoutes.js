const express = require("express")
const {
  createAttendance,
  getAttendanceByDate,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendanceController")
const authorize = require("../middlewares/auth")
const router = express.Router()

router.post("/create", authorize, createAttendance)
router.get("/get-attendance", authorize, getAttendanceByDate)
router.put("/update", authorize, updateAttendance)
router.delete("/delete", authorize, deleteAttendance)

module.exports = router
