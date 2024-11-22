const Student = require("../models/Student")
const Class = require("../models/Class")
const uploadAndGetImageUrl = require("../helpers/cloudinaryUpload")
const querySchema = require("../zod schemas/querySchema")
const studentSchema = require("../zod schemas/studentSchema")

async function addStudent(req, res) {
  try {
    const { name, email, classId } = req.body
    const validatedFields = studentSchema.safeParse({
      name,
      email,
      classId,
    })
    if (!validatedFields.success) {
      res.status(400).json(validatedFields.error.flatten().fieldErrors)
      return
    }

    let response = null
    if (req.file) {
      response = uploadAndGetImageUrl(req.file.buffer, "students")

      if (response.error) {
        res
          .status(response.status)
          .json({ message: "Error uploading file or getting URL" })
        return
      }
    }
    const student = new Student({
      name,
      email,
      classId,
      profileImageUrl: response,
    })

    await student.save()
    res.status(201).json({ message: "Student added successfully", student })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

async function getAllStudents(req, res) {
  try {
    const { limit, page = 1, className } = req.query
    const validatedFields = querySchema.safeParse({
      limit,
      page,
      className,
    })
    if (!validatedFields.success) {
      res.status(400).json(validatedFields.error.flatten().fieldErrors)
      return
    }

    const query = {}
    query.isDeleted = false
    const queryOptions = {}

    if (limit) {
      queryOptions.limit = limit
      queryOptions.skip = (page - 1) * limit
    }

    if (className) {
      const studentClass = await Class.findOne({ name: className })
      query.classId = studentClass.id
    }

    const students = await Student.find(query, null, queryOptions)
    res.status(200).json({ message: "Students fetched successfully", students })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

async function getStudent(req, res) {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ message: "Missing ID" })
    }
    const student = await Student.findOne({ id })
    res
      .status(200)
      .json({ message: "Student data fetched successfully", student })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

async function updateStudent(req, res) {
  try {
    const { id } = req.params
    const { name, email, classId } = req.body
    const validatedFields = studentSchema.safeParse({
      name,
      email,
      classId,
    })
    if (!validatedFields.success) {
      res.status(400).json(validatedFields.error.flatten().fieldErrors)
      return
    }

    let response = null
    if (req.file) {
      response = uploadAndGetImageUrl(req.file.buffer, "students")

      if (response.error) {
        res
          .status(response.status)
          .json({ message: "Error uploading file or getting URL" })
        return
      }
    }

    const updatedData = {}

    if (name) updatedData.name = name
    if (email) updatedData.email = email
    if (classId) updatedData.classId = classId
    if (response) updatedData.profileImageUrl = response

    const updatedStudent = await Student.findOneAndUpdate({ id }, updatedData, {
      new: true,
      runValidators: true,
    })

    res
      .status(200)
      .json({ message: "Student data updated successfully", updatedStudent })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

async function deleteStudent(req, res) {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ message: "Missing ID" })
    }
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        runValidators: true,
      }
    )
    res
      .status(200)
      .json({ message: "Student deleted successfully", deletedStudent })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

module.exports = {
  addStudent,
  getAllStudents,
  getStudent,
  updateStudent,
  deleteStudent,
}
