"use server";

import { auth } from "@/auth";
import { db } from "@/db/db-client";
import { revalidatePath } from "next/cache";

interface FormState {
  errors?: {
    _form?: string[];
  };
  success?: boolean;
}

export async function deleteBlogPost(
  postId: string,
  state: FormState
): Promise<FormState> {
  const sessions = await auth();

  if (!sessions?.user || !sessions) {
    return {
      errors: {
        _form: ["You are not authorised to perform this action"],
      },
    };
  }

  let blogtoDelete;
  try {
    blogtoDelete = await db.posts.delete({
      where: {
        id: postId,
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
          _form: ["Something went wrong with deleting the blog"],
        },
      };
    }
  }

  revalidatePath("/blogs");
  return {
    success: true,
  };
}
