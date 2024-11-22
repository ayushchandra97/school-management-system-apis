const Student = require("../models/Student")
const Class = require("../models/Class")

async function generateReport(req, res) {
  const { classId } = req.params

  if (!classId || typeof classId !== "string") {
    return res
      .status(400)
      .json({ message: "ClassId not provided or invalid classId" })
  }
  try {
    const classData = await Class.findById(classId).populate("teacherId")

    if (!classData) {
      return res.status(404).json({ message: "Class does not exist" })
    }

    const students = await Student.find({ classId, isDeleted: false })

    res.status(200).json({
      class: classData.name,
      studentCount: classData.studentCount,
      teacher: classData.teacherId,
      students: students.map((student) => ({
        id: student.id,
        name: student.name,
        email: student.email,
        profileImageUrl: student.profileImageUrl,
      })),
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = generateReport
