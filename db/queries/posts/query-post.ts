import { cache } from "react";
import { Posts } from "@prisma/client";
import { db } from "@/db/db-client";

export type PostWithData = Posts & {
  user: { name: string | null; image: string | null };
};

export const fetchPostsData = cache((): Promise<PostWithData[]> => {
  return db.posts.findMany({
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
});
//the reason we caching is because we need the function in different parts of the app and we don't have to make a trip to the database all the time
