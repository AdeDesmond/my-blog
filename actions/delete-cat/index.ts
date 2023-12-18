"use server";

import { db } from "@/db/db-client";
import { revalidatePath } from "next/cache";

interface DeleteCatProps {
  errors?: {
    _form?: string[];
  };
  success?: boolean;
}

export async function deleteCat(id: string): Promise<DeleteCatProps> {
  let catToDelete;
  try {
    catToDelete = await db.category.delete({
      where: {
        id: id,
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
          _form: ["Someting went wrong with deleting the category"],
        },
      };
    }
  }
  revalidatePath("/category");
  return {
    errors: {},
    success: true,
  };
}
