const { z } = require("zod")

const teacherSchema = z.object({
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
  subject: z.string({
    required_error: "Subject is required",
    invalid_type_error: "Invalid subject",
  }),
  profileImageUrl: z
    .string({
      required_error: "Profile image URL is required",
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

module.exports = teacherSchema
