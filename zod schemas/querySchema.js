const { z } = require("zod")

const studentsQuerySchema = z.object({
  page: z.coerce
    .number({
      invalid_type_error: "Invalid number",
    })
    .min(1, { message: "Invalid number" })
    .optional(),
  limit: z.coerce
    .number({
      invalid_type_error: "Invalid number",
    })
    .min(5, { message: "Limit must be at least 5" })
    .nullable()
    .optional(),
  class: z
    .string({
      invalid_type_error: "Invalid class",
    })
    .optional(),
})

module.exports = studentsQuerySchema
