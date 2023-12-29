"use server";

import { auth } from "@/auth";
import { db } from "@/db/db-client";
import { revalidatePath } from "next/cache";
import { deleteBookMark } from "../delete-bookmark";
import { Boomarks } from "@prisma/client";

interface BookMarkState {
  errors?: {
    _form?: string[];
  };
  success?: boolean;
}

export async function createBookMark(
  postId: string,
  formState: BookMarkState
): Promise<BookMarkState> {
  const session = await auth();
  if (!session?.user || !session) {
    return {
      errors: {
        _form: ["You must be logged in to perform this action"],
      },
    };
  }

  let blogToBookMark;
  try {
    const alreadyBookMarked: any = await db.boomarks.findFirst({
      where: {
        postId,
      },
    });

    if (alreadyBookMarked) {
      return {
        errors: {
          _form: ["already bookmarked"],
        },
      };
    }

    if (!alreadyBookMarked) {
      blogToBookMark = await db.boomarks.create({
        data: {
          postId,
          userId: session.user.id,
          isBookMarked: true,
        },
      });
    }

    //
    //if (!alreadyBookMarked && !alreadyBookMarked.isBookMarked) {
    //
    //  return {
    //    errors: {
    //      _form: ["blog already bookmarked"],
    //    },
    //  };
    //}
    // if (alreadyBookMarked) {
    //   await deleteBookMark(postId, formState);
    // }
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
          _form: ["You bookmarked failed to be created"],
        },
      };
    }
  }
  revalidatePath("/bookmark");
  return {
    success: true,
  };
}
