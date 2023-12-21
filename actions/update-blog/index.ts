"use server";

import { auth } from "@/auth";
import { updateBlogSchema } from "./schema";

interface UpdateFormState {
  errors?: {
    title?: string[];
    subtitle?: string[];
    content?: string[];
    image?: string[];
    _form?: string[];
  };
  success?: boolean;
}

export async function updateBlog(
  formState: UpdateFormState,
  formData: FormData
): Promise<UpdateFormState> {
  const session = await auth();
  if (!session?.user || !session) {
    return {
      errors: {
        _form: ["You are not authorised to perform this action"],
      },
    };
  }
  const validatedState = updateBlogSchema.safeParse({
    title: formData.get("title"),
    subtitle: formData.get("subtitle"),
    content: formData.get("content"),
    image: formData.get("image"),
  });

  if (!validatedState.success) {
    return {
      errors: validatedState.error.flatten().fieldErrors,
    };
  }

  const { title, subtitle, content, image } = validatedState.data;

  let dataToUpdate;

  try {
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
          _form: ["Something went wrong with updating the blog"],
        },
      };
    }
  }

  return {
    success: true,
  };
}
