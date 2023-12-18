import { z } from "zod";

export const catSchema = z.object({
  category: z
    .string({
      required_error: "category must be a string",
      invalid_type_error: "invalid category string",
    })
    .min(2, { message: "category must be at least three characters" }),
});
