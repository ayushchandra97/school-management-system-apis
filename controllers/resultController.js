const Student = require("../models/Student")
const Exam = require("../models/Exam")
const Result = require("../models/Result")
const querySchema = require("../zod schemas/querySchema")
const {
  resultSchema,
  updateResultSchema,
} = require("../zod schemas/resultSchema")

async function createResult(req, res) {
  try {
    const { studentId, examId, marks } = req.body
    const validatedFields = resultSchema.safeParse({
      studentId,
      examId,
      marks,
    })
    if (!validatedFields.success) {
      res.status(400).json(validatedFields.error.flatten().fieldErrors)
      return
    }

    const student = await Student.findOne({ id: studentId })
    const exam = await Exam.findOne({ id: examId })

    if (!student || !exam) {
      return res.status(404).json({ message: "Data not found" })
    }

    if (marks > exam.maxMarks || marks < 0) {
      return res
        .status(400)
        .json({ message: "Marks must not exceed max marks or be less than 0" })
    }

    const result = new Result({
      studentId,
      examId,
      marks,
    })

    const saved = await result.save()
    res.status(201).json({ message: "Result created successfully", saved })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

async function getAllResults(req, res) {
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

    const results = await Result.find({}, null, queryOptions)
    res.status(200).json({ message: "Results fetched successfully", results })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

async function updateResult(req, res) {
  try {
    const { id } = req.params
    const { studentId, examId, marks } = req.body
    const validatedFields = updateResultSchema.safeParse({
      studentId,
      examId,
      marks,
    })
    if (!validatedFields.success) {
      res.status(400).json(validatedFields.error.flatten().fieldErrors)
      return
    }

    const updatedData = {}

    if (studentId) {
      const student = await Student.findOne({ id: studentId })
      if (!student) {
        res.status(404).json({ message: "Student does not exist" })
      }
      updatedData.studentId = studentId
    }

    let exam
    if (examId) {
      exam = await Exam.findOne({ id: examId })
      if (!exam) {
        res.status(404).json({ message: "Exam does not exist" })
      }
      updatedData.examId = examId
    }

    if (marks) {
      if (marks > exam.maxMarks || marks < 0) {
        return res.status(400).json({
          message: "Marks must not exceed max marks or be less than 0",
        })
      }
      updatedData.marks = marks
    }

    const updatedResult = await Result.findOneAndUpdate({ id }, updatedData, {
      new: true,
      runValidators: true,
    })

    res
      .status(200)
      .json({ message: "Result updated successfully", updatedResult })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

async function deleteResult(req, res) {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ message: "Missing ID" })
    }
    const deletedResult = await Result.findOneAndDelete({ id })
    res
      .status(200)
      .json({ message: "Result deleted successfully", deletedResult })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

module.exports = {
  createResult,
  getAllResults,
  updateResult,
  deleteResult,
}
