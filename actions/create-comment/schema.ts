import { z } from "zod";

export const createCommentSchema = z.object({
  content: z
    .string({
      required_error: "Comment must be a string",
      invalid_type_error: " invalid comment string",
    })
    .min(2, { message: " comment must be at least 3 characters" }),
});
