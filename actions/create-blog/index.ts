"use server";

import { auth } from "@/auth";
import { createBlogSchema } from "./schema";
import { db } from "@/db/db-client";

interface CreateBlogPostProps {
  errors?: {
    title?: string[];
    subtitle?: string[];
    content?: string[];
    image?: string[];
    color?: string[];
    categoryId?: string[];
    _form?: string[];
  };
  success?: boolean;
}
export async function createBlogPost(
  formState: CreateBlogPostProps,
  formData: FormData
): Promise<CreateBlogPostProps> {
  const sessions = await auth();
  if (!sessions?.user || !sessions) {
    return {
      errors: {
        _form: ["You are not authorised to perform this action"],
      },
    };
  }
  const validatedFields = createBlogSchema.safeParse({
    title: formData.get("title"),
    subtitle: formData.get("subtitle"),
    content: formData.get("content"),
    image: formData.get("image"),
    color: formData.get("color"),
    categoryId: formData.get("category"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { title, subtitle, categoryId, content, image, color } =
    validatedFields.data;

  let blogs;
  try {
    blogs = await db.posts.create({
      data: {
        title: title,
        subtitle: subtitle,
        content: content,
        image: image,
        color: color,
        categoryId: categoryId,
        userId: sessions.user.id,
      },
    });
  } catch (errors: unknown) {
    if (errors instanceof Error) {
      return {
        errors: {
          _form: [errors.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong with the creation of your blog post"],
        },
      };
    }
  }
  return {
    success: true,
  };
}
