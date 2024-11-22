const { z } = require("zod")

const studentSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Invalid name",
    })
    .min(1, { message: "Name must have atleast 1 character" }),
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Invalid email",
  }),
  classId: z.string({
    required_error: "ClassId is required",
    invalid_type_error: "Invalid classId",
  }),
  profileImageUrl: z
    .string({
      invalid_type_error: "Invalid profile image URL",
    })
    .nullable()
    .optional(),
  isDeleted: z
    .boolean({
      invalid_type_error: "Invalid delete value",
    })
    .optional(),
})

module.exports = studentSchema
