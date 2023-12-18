import { db } from "@/db/db-client";
import { PostWithData } from "./query-post";

export const fetchPostWithFullContent = (id: string): Promise<any> => {
  return db.posts.findUnique({
    where: {
      id: id,
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
};
