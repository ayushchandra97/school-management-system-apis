const express = require("express")
const {
  createClass,
  assignTeacherToClass,
  getAllClasses,
  updateClass,
  deleteClass,
} = require("../controllers/classController")
const authorize = require("../middlewares/auth")
const router = express.Router()

router.post("/create", authorize, createClass)
router.post("/assign-teacher", authorize, assignTeacherToClass)
router.get("/get-all-classes", authorize, getAllClasses)
router.put("/update", authorize, updateClass)
router.delete("/delete", authorize, deleteClass)

module.exports = router
