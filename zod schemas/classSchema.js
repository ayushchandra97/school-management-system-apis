const { z } = require("zod")

const classSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Invalid name",
    })
    .min(1, { message: "Name must have atleast 1 character" }),
  teacherId: z.string({
    required_error: "TeacherId is required",
    invalid_type_error: "Invalid teacherId",
  }),
  studentCount: z
    .number({
      invalid_type_error: "Invalid student count",
    })
    .optional(),
})

module.exports = classSchema
