const Admin = require("../models/Admin")
const adminSchema = require("../zod schemas/adminSchema")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

async function createAdmin(req, res) {
  try {
    const { username, password } = req.body
    const validatedFields = adminSchema.safeParse({
      username,
      password,
    })
    if (!validatedFields.success) {
      res.status(400).json(validatedFields.error.flatten().fieldErrors)
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword)

    const admin = new Admin({
      username,
      password: hashedPassword,
    })

    await admin.save()

    const data = {
      admin: {
        id: admin.id,
      },
    }

    const token = jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    })
    res.status(201).json({ message: "Admin created successfully", token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

async function loginAsAdmin(req, res) {
  try {
    const { username, password } = req.body

    const validatedFields = adminSchema.safeParse({
      username,
      password,
    })

    if (!validatedFields.success) {
      res.status(400).json(validatedFields.error.flatten().fieldErrors)
      return
    }

    let admin = await Admin.findOne({ username })
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const match = await bcrypt.compare(password, admin.password)
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const data = {
      admin: {
        id: admin.id,
      },
    }

    const token = jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    })
    res.status(200).json({ message: "Admin login successful", token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

module.exports = { createAdmin, loginAsAdmin }
