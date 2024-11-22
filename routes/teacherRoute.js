const express = require("express")
const {
  addTeacher,
  getAllTeachers,
  getTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teacherController")
const authorize = require("../middlewares/auth")
const router = express.Router()

router.post("/create", authorize, addTeacher)
router.get("/get-all-teachers", authorize, getAllTeachers)
router.get("/get-teacher", authorize, getTeacher)
router.put("/update", authorize, updateTeacher)
router.delete("/delete", authorize, deleteTeacher)

module.exports = router
