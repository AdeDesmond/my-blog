"use server";

import { auth } from "@/auth";
import { updateBlogSchema } from "./schema";
import { db } from "@/db/db-client";
import { revalidatePath } from "next/cache";

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
  postId: string,
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
    categoryId: formData.get("category"),
  });

  if (!validatedState.success) {
    return {
      errors: validatedState.error.flatten().fieldErrors,
    };
  }

  const { title, subtitle, content, categoryId } = validatedState.data;

  let dataToUpdate;

  try {
    dataToUpdate = await db.posts.update({
      where: {
        id: postId,
      },
      data: {
        title,
        subtitle,
        content,
        categoryId,
      },
    });
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

  revalidatePath("/");

  return {
    success: true,
  };
}
