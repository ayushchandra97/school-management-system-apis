const { z } = require("zod")

const resultSchema = z.object({
  studentId: z
    .string({
      required_error: "StudentId is required",
      invalid_type_error: "Invalid studentId",
    })
    .min(1, { message: "Name must have atleast 1 character" }),
  examId: z.string({
    required_error: "ExamId is required",
    invalid_type_error: "Invalid examId",
  }),
  marks: z.number({
    required_error: "Marks is required",
    invalid_type_error: "Invalid marks",
  }),
})

const updateResultSchema = z.object({
  studentId: z
    .string({
      invalid_type_error: "Invalid studentId",
    })
    .min(1, { message: "Name must have atleast 1 character" })
    .optional(),
  examId: z
    .string({
      invalid_type_error: "Invalid examId",
    })
    .optional(),
  marks: z
    .number({
      invalid_type_error: "Invalid marks",
    })
    .optional(),
})

module.exports = { resultSchema, updateResultSchema }
