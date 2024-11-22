const Exam = require("../models/Exam")
const Class = require("../models/Class")
const querySchema = require("../zod schemas/querySchema")
const examSchema = require("../zod schemas/examSchema")

async function createExam(req, res) {
  try {
    const { name, classId, maxTheoryMarks, maxPracticalMarks = null } = req.body
    const validatedFields = examSchema.safeParse({
      name,
      classId,
      maxTheoryMarks,
      maxPracticalMarks,
    })
    if (!validatedFields.success) {
      res.status(400).json(validatedFields.error.flatten().fieldErrors)
      return
    }

    const classData = await Class.findOne({ id: classId, isDeleted: false })

    if (!classData) {
      return res.status(404).json({ message: "Class does not exist" })
    }

    const exam = new Exam({
      name,
      classId,
      maxTheoryMarks,
      maxPracticalMarks,
    })

    await exam.save()
    res.status(201).json({ message: "Exam created successfully", exam })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

async function getAllExams(req, res) {
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

    const exams = await Exam.find({}, null, queryOptions)
    res.status(200).json({ message: "Exams fetched successfully", exams })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

async function updateExam(req, res) {
  try {
    const { id } = req.params
    const { name, classId, maxTheoryMarks, maxPracticalMarks } = req.body
    const validatedFields = examSchema.safeParse({
      name,
      classId,
      maxTheoryMarks,
      maxPracticalMarks,
    })
    if (!validatedFields.success) {
      res.status(400).json(validatedFields.error.flatten().fieldErrors)
      return
    }
    const updatedData = {}

    if (classId) {
      const classData = await Class.findOne({ id: teacherId })
      if (!classData) {
        return res.status(404).json({ message: "Class does not exist" })
      }
      updatedData.classId = classId
    }

    if (name) updatedData.name = name
    if (maxTheoryMarks) updatedData.maxTheoryMarks = maxTheoryMarks
    if (maxPracticalMarks) updatedData.maxPracticalMarks = maxPracticalMarks

    const updatedExam = await Exam.findOneAndUpdate({ id }, updatedData, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({ message: "Exam updated successfully", updatedExam })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

async function deleteExam(req, res) {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ message: "Missing ID" })
    }
    const deletedExam = await Exam.findOneAndDelete({ id })
    res.status(200).json({ message: "Exam deleted successfully", deletedExam })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

module.exports = {
  createExam,
  getAllExams,
  updateExam,
  deleteExam,
}
