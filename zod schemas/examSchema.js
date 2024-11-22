const { z } = require("zod")

const examSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Invalid name",
    })
    .min(1, { message: "Name must have atleast 1 character" }),
  classId: z.string({
    required_error: "ClassId is required",
    invalid_type_error: "Invalid classId",
  }),
  maxTheoryMarks: z.coerce.number({
    required_error: "Max theory marks is required",
    invalid_type_error: "Invalid max theory marks",
  }),
  maxPracticalMarks: z.coerce
    .number({
      invalid_type_error: "Invalid max practical marks",
    })
    .optional(),
})

module.exports = examSchema
