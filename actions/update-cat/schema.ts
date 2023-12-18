import { z } from "zod";

export const updateCatSchema = z.object({
  category: z
    .string({
      required_error: "  category must be a valid string",
      invalid_type_error: " category must be a string",
    })
    .min(2, { message: "category must be at least 3 characters" }),
});
