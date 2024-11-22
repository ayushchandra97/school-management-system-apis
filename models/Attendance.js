const mongoose = require("mongoose")

const AttendanceSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  students: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
      status: {
        type: String,
        enum: ["Present", "Absent", "Leave"],
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports =
  mongoose.models.Attendance || mongoose.model("Attendance", AttendanceSchema)
