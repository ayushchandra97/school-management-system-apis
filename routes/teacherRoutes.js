const express = require("express")
const {
  addTeacher,
  getAllTeachers,
  getTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teacherController")
const authorize = require("../middlewares/auth")
const upload = require("../middlewares/multerUpload")
const router = express.Router()

router.post("/create", authorize, upload.single("profileImage"), addTeacher)
router.get("/get-all-teachers", authorize, getAllTeachers)
router.get("/get-teacher/:id", authorize, getTeacher)
router.put("/update", authorize, upload.single("profileImage"), updateTeacher)
router.delete("/delete", authorize, deleteTeacher)

module.exports = router
