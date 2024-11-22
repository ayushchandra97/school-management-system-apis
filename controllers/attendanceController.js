const Attendance = require("../models/Attendance")
const Class = require("../models/Class")
const Student = require("../models/Student")
const querySchema = require("../zod schemas/querySchema")
const attendanceSchema = require("../zod schemas/attendanceSchema")

async function createAttendance(req, res) {
  try {
    const { date, classId, students } = req.body
    const validatedFields = attendanceSchema.safeParse({
      date,
      classId,
      students,
    })
    if (!validatedFields.success) {
      res.status(400).json(validatedFields.error.flatten().fieldErrors)
      return
    }

    const classData = await Class.findOne({ id: classId })
    if (!classData) {
      return res.status(404).json({ message: "Class does not exist" })
    }

    const attendance = new Attendance({
      date,
      classId,
      students,
    })

    await attendance.save()
    res
      .status(201)
      .json({ message: "Attendance created successfully", attendance })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

async function getAttendanceByDate(req, res) {
  try {
    const { date } = req.body

    if (!date || typeof date !== "string") {
      return res
        .status(400)
        .json({ message: "No date provided or invalid date" })
    }

    const attendance = await Attendance.findOne({ date })
    res
      .status(200)
      .json({ message: "Attendance fetched successfully", attendance })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

async function updateAttendance(req, res) {
  try {
    const { id } = req.params
    const { name, classId, students } = req.body
    const validatedFields = attendanceSchema.safeParse({
      name,
      classId,
      students,
    })
    if (!validatedFields.success) {
      res.status(400).json(validatedFields.error.flatten().fieldErrors)
      return
    }

    const updatedData = {}

    if (classId) {
      const classData = await Class.findOne({ id: classId })
      if (!classData) {
        return res.status(404).json({ message: "Class does not exist" })
      }
      updatedData.classId = classId
    }

    if (name) updatedData.name = name
    updatedData.students = students

    const updatedAttendance = await Attendance.findOneAndUpdate(
      { id },
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    )

    res
      .status(200)
      .json({ message: "Attendance updated successfully", updatedAttendance })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

async function deleteAttendance(req, res) {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ message: "Missing ID" })
    }
    const deletedAttendance = await Attendance.findOneAndDelete({ id })
    res
      .status(200)
      .json({ message: "Attendance deleted successfully", deletedAttendance })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

module.exports = {
  createAttendance,
  getAttendanceByDate,
  updateAttendance,
  deleteAttendance,
}
