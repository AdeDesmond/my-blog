"use server";

import { db } from "@/db/db-client";
import { createCommentSchema } from "./schema";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

interface CommentFormProps {
  errors?: {
    content?: string[];
    _form?: string[];
  };
  success?: boolean;
}
//make sure to implement the parentId
export async function createComment(
  { postId, parentId }: { postId: string; parentId?: string },
  formState: CommentFormProps,
  formData: FormData
): Promise<CommentFormProps> {
  const session = await auth();
  if (!session?.user || !session) {
    return {
      errors: {
        _form: [" You are not authorised to perform this action "],
      },
    };
  }
  const validatedFields = createCommentSchema.safeParse({
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { content } = validatedFields.data;
  let commentToCreate;
  try {
    commentToCreate = await db.comments.create({
      data: {
        content,
        postId,
        userId: session.user.id as string,
        parentId,
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
          _form: ["Something went wrong with creating your comment"],
        },
      };
    }
  }
  revalidatePath(`/blogs/blogcontent/${postId}`);
  return {
    success: true,
  };
}
