const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const connectDB = require("./config/db")
const studentRoutes = require("./routes/studentRoutes")
const teacherRoutes = require("./routes/teacherRoutes")
const classRoutes = require("./routes/classRoutes")
const adminRoutes = require("./routes/adminRoutes")
const attendanceRoutes = require("./routes/attendanceRoutes")
const examRoutes = require("./routes/examRoutes")
const resultRoutes = require("./routes/resultRoutes")
const reportRoute = require("./routes/reportRoute")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ limit: "10mb", extended: true }))

connectDB()

app.use("/api/students", studentRoutes)
app.use("/api/teachers", teacherRoutes)
app.use("/api/classes", classRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/attendances", attendanceRoutes)
app.use("/api/exams", examRoutes)
app.use("/api/results", resultRoutes)
app.use("/api/report", reportRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
