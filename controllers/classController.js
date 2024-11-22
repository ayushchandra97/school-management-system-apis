const Class = require("../models/Class")
const Student = require("../models/Student")
const Teacher = require("../models/Teacher")
const querySchema = require("../zod schemas/querySchema")
const classSchema = require("../zod schemas/classSchema")

async function createClass(req, res) {
  try {
    const { name, teacherId } = req.body
    const validatedFields = classSchema.safeParse({
      name,
      teacherId,
    })
    if (!validatedFields.success) {
      res.status(400).json(validatedFields.error.flatten().fieldErrors)
      return
    }

    const studentCount = await Student.countDocuments({ isDeleted: false })

    const classData = new Class({
      name,
      teacherId,
      studentCount,
    })

    await classData.save()
    res.status(201).json({ message: "Class created successfully", classData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

async function assignTeacherToClass(req, res) {
  try {
    const { id } = req.params
    const { teacherId } = req.body

    if (
      !teacherId ||
      !id ||
      typeof id !== "string" ||
      typeof teacherId !== "string"
    ) {
      res.status(400).json({ message: "Missing fields or bad request" })
      return
    }

    const teacher = await Teacher.findOne({ id: teacherId })

    if (!teacher) {
      return res.status(404).json({ message: "Teacher does not exist" })
    }

    const updatedClass = await Class.findOneAndUpdate(
      { id },
      { teacherId },
      {
        new: true,
        runValidators: true,
      }
    )

    res
      .status(200)
      .json({ message: "Teacher assigned successfully", updatedClass })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

async function getAllClasses(req, res) {
  try {
    const { limit, page = 1 } = req.query
    const validatedFields = querySchema.safeParse({
      limit,
      page,
    })
    if (!validatedFields.success) {
      res.status(400).json(validatedFields.error.flatten().fieldErrors)
      return
    }

    const queryOptions = {}

    if (limit) {
      queryOptions.limit = limit
      queryOptions.skip = (page - 1) * limit
    }

    const classes = await Class.find({}, null, queryOptions)
    res.status(200).json({ message: "Classes fetched successfully", classes })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

async function updateClass(req, res) {
  try {
    const { id } = req.params
    const { name, teacherId } = req.body
    const validatedFields = classSchema.safeParse({
      name,
      teacherId,
    })
    if (!validatedFields.success) {
      res.status(400).json(validatedFields.error.flatten().fieldErrors)
      return
    }

    const teacher = await Teacher.findOne({ id: teacherId })

    if (!teacher) {
      return res.status(404).json({ message: "Teacher does not exist" })
    }

    const studentCount = await Student.countDocuments({ isDeleted: false })

    const updatedData = {}

    if (name) updatedData.name = name
    if (teacherId) updatedData.teacherId = teacherId
    updatedData.studentCount = studentCount

    const updatedClass = await Student.findOneAndUpdate({ id }, updatedData, {
      new: true,
      runValidators: true,
    })

    res
      .status(200)
      .json({ message: "Class updated successfully", updatedClass })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

async function deleteClass(req, res) {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ message: "Missing ID" })
    }
    const deletedClass = await Student.findOneAndDelete({ id })
    res
      .status(200)
      .json({ message: "Class deleted successfully", deletedClass })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

module.exports = {
  createClass,
  assignTeacherToClass,
  getAllClasses,
  updateClass,
  deleteClass,
}
