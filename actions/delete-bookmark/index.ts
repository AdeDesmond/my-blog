"use server";

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
