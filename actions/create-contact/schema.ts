import { z } from "zod";

export const createEmailSchema = z.object({
  name: z
    .string()
    .min(3, { message: "name must be at least three characters" }),
  email: z.string().email(),
  message: z.string(),
});
