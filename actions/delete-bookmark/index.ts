"use server";

import { auth } from "@/auth";
import { db } from "@/db/db-client";
import { revalidatePath } from "next/cache";

interface DeleteBookMarkProps {
  errors?: {
    _form?: string[];
  };
  success?: boolean;
}

export async function deleteBookMark(
  id: string,
  formState: DeleteBookMarkProps
): Promise<DeleteBookMarkProps> {
  const session = await auth();
  if (!session?.user || !session) {
    return {
      errors: {
        _form: ["You must be logged in to perform this action"],
      },
    };
  }
  let boookmarkedBlogToDelete;
  try {
    boookmarkedBlogToDelete = await db.boomarks.delete({
      where: {
        id,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    }
  }

  revalidatePath("/bookmark");
  return {
    success: true,
  };
}
