"use server";

import { auth } from "@/auth";
import { catSchema } from "./schema";
import { db } from "@/db/db-client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";

interface FormState {
  errors?: {
    category?: string[];
    _form?: string[];
  };
  success?: boolean;
}

export async function createCategory(
  formState: FormState,
  formData: FormData
): Promise<FormState> {
  const sessions = await auth();
  if (!sessions || !sessions.user) {
    return {
      errors: {
        _form: ["You must be logged in to perform this action"],
      },
    };
  }

  const validatedFields = catSchema.safeParse({
    category: formData.get("category"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { category } = validatedFields.data;
  let cat;
  try {
    cat = await db.category.create({
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
          _form: ["something went wrong with the creation of category"],
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
