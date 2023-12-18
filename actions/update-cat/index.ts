"use server";

import { auth } from "@/auth";
import { updateCatSchema } from "./schema";
import { db } from "@/db/db-client";
import { revalidatePath } from "next/cache";

interface UpdateCatProps {
  errors?: {
    category?: string[];
    _form?: string[];
  };
  success?: boolean;
}

export async function updateCat(
  id: string,
  formState: UpdateCatProps,
  formData: FormData
): Promise<UpdateCatProps> {
  const sessions = await auth();
  if (!sessions?.user || !sessions) {
    return {
      errors: {
        _form: ["You are not authorised to perform this action"],
      },
    };
  }

  const validatedFields = updateCatSchema.safeParse({
    category: formData.get("category"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { category } = validatedFields.data;
  let catToUpdate;
  try {
    catToUpdate = await db.category.update({
      where: {
        id: id,
      },
      data: {
        category,
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
          _form: ["Something went wrong with the update "],
        },
      };
    }
  }

  revalidatePath("/category");
  return {
    success: true,
  };
}
