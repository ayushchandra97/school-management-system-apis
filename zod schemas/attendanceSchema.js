const { z } = require("zod")

const attendanceSchema = z.object({
  date: z.string({
    required_error: "Date is required",
    invalid_type_error: "Invalid date",
  }),
  classId: z.string({
    required_error: "ClassId is required",
    invalid_type_error: "Invalid classId",
  }),
  students: z.array({
    studentId: z.string({
      required_error: "StudentId is required",
      invalid_type_error: "Invalid studentId",
    }),
    status: z.enum(["Present", "Absent", "Leave"]),
  }),
})

module.exports = attendanceSchema
