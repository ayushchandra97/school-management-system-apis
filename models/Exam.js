const mongoose = require("mongoose")

const examSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  maxTheoryMarks: {
    type: Number,
    required: true,
  },
  maxPracticalMarks: {
    type: Number,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.models.Exam || mongoose.model("Result", examSchema)
