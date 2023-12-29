import { db } from "@/db/db-client";
import { PostWithData } from "./query-post";

export const fetchPostsWithSearchTerm = (
  term: string
): Promise<PostWithData[]> => {
  return db.posts.findMany({
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    where: {
      OR: [
        {
          title: { contains: term, mode: "insensitive" },
          subtitle: { contains: term, mode: "insensitive" },
          content: { contains: term, mode: "insensitive" },
        },
      ],
    },
  });
};
//
