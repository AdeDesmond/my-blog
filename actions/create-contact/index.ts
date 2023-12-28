"use server";

import { sendEmail } from "@/helpers/send-mail";
import { createEmailSchema } from "./schema";

interface SendEmailFormState {
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
    _form?: string[];
  };
  success?: boolean;
}

export async function sendEmailContact(
  state: SendEmailFormState,
  formData: FormData
): Promise<SendEmailFormState> {
  try {
    const validatedFields = createEmailSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { name, email, message } = validatedFields.data;

    await sendEmail(name, email, message);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong with sending your message"],
        },
      };
    }
  }
  return {
    success: true,
  };
}
