const Teacher = require("../models/Teacher")
const uploadAndGetImageUrl = require("../helpers/cloudinaryUpload")
const querySchema = require("../zod schemas/querySchema")
const teacherSchema = require("../zod schemas/teacherSchema")

async function addTeacher(req, res) {
  try {
    const { name, email, subject } = req.body
    const validatedFields = teacherSchema.safeParse({
      name,
      email,
      subject,
    })
    if (!validatedFields.success) {
      res.status(400).json(validatedFields.error.flatten().fieldErrors)
      return
    }

    let response = null
    console.log("Just before req.file")
    if (req.file) {
      console.log(req.file.originalname)
      response = await uploadAndGetImageUrl(req.file.path, "teachers")
      console.log(response)
    }

    if (response.message) {
      res
        .status(response.status)
        .json({ message: "Error uploading file or getting URL" })
      return
    }
    console.log("Working fine so far!")
    const teacher = new Teacher({
      name,
      email,
      subject,
      profileImageUrl: response,
    })

    console.log(teacher)

    await teacher.save()
    res.status(201).json({ message: "Teacher added successfully", teacher })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

async function getAllTeachers(req, res) {
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

    const teachers = await Teacher.find(
      { isDeleted: false },
      null,
      queryOptions
    )
    res.status(200).json({ message: "Teachers fetched successfully", teachers })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

async function getTeacher(req, res) {
  try {
    const { id } = req.params
    console.log(id)
    if (!id) {
      return res.status(400).json({ message: "Missing ID" })
    }
    const teacher = await Teacher.findById(id)
    res
      .status(200)
      .json({ message: "Teacher data fetched successfully", teacher })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

async function updateTeacher(req, res) {
  try {
    const { id } = req.params
    const { name, email, subject } = req.body
    const validatedFields = teacherSchema.safeParse({
      name,
      email,
      subject,
    })
    if (!validatedFields.success) {
      res.status(400).json(validatedFields.error.flatten().fieldErrors)
      return
    }

    let response = null
    if (req.file) {
      response = uploadAndGetImageUrl(req.file.buffer, "teachers")

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
    if (subject) updatedData.subject = subject
    if (response) updatedData.profileImageUrl = response

    const updatedTeacher = await Teacher.findOneAndUpdate({ id }, updatedData, {
      new: true,
      runValidators: true,
    })

    res
      .status(200)
      .json({ message: "Teacher data updated successfully", updatedTeacher })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

async function deleteTeacher(req, res) {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ message: "Missing ID" })
    }
    const deletedTeacher = await Teacher.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        runValidators: true,
      }
    )
    res
      .status(200)
      .json({ message: "Teacher deleted successfully", deletedTeacher })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

module.exports = {
  addTeacher,
  getAllTeachers,
  getTeacher,
  updateTeacher,
  deleteTeacher,
}
