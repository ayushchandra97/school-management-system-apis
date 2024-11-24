const express = require("express")
const {
  addStudent,
  getAllStudents,
  getStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController")
const authorize = require("../middlewares/auth")
const upload = require("../middlewares/multerUpload")
const router = express.Router()

router.post("/create", authorize, upload.single("profileImage"), addStudent)
router.get("/get-all-classes", authorize, getAllStudents)
router.get("/get-student", authorize, getStudent)
router.put("/update", authorize, upload.single("profileImage"), updateStudent)
router.delete("/delete", authorize, deleteStudent)

module.exports = router
