import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string({
    required_error: "title must be a string",
    invalid_type_error: "invalid string type",
  }),
  subtitle: z.string({
    required_error: "subtitle must be a string",
    invalid_type_error: "invalid string type",
  }),
  content: z.string({
    required_error: "content must be a string",
    invalid_type_error: "invalid string type",
  }),
  image: z.string({
    required_error: "image must be a string",
    invalid_type_error: "invalid string type",
  }),
  color: z.string({
    required_error: "color must be a string",
    invalid_type_error: "invalid string type",
  }),
  categoryId: z.string({
    required_error: "categoryId must be a string",
    invalid_type_error: "invalid string type",
  }),
});
