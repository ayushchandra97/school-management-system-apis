const { z } = require("zod")

const adminSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Invalid username",
    })
    .min(1, { message: "Username must have atleast 1 character" }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Invalid password",
    })
    .min(6, { message: "Password must have atleast 6 characters" }),
})

module.exports = adminSchema
