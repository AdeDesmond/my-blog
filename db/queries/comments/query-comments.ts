import { db } from "@/db/db-client";
import { Comments } from "@prisma/client";
import { cache } from "react";

export type CommentsWithAuthor = Comments & {
  user: { name: string | null; image: string | null };
};

export const fetchCommentsByPostId = cache(
  (postId: string): Promise<CommentsWithAuthor[]> => {
    return db.comments.findMany({
      where: {
        postId,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
  }
);
