import { db } from "@/db/db-client";
import { PostWithData } from "./query-post";

export const fetchPostsWithSearchTerm = (
  term: string
): Promise<PostWithData[]> => {
  return db.posts.findMany({
    where: {
      OR: [
        {
          title: { contains: term },
          subtitle: { contains: term },
          content: { contains: term },
        },
      ],
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      create_at: "desc",
    },
  });
};
//
