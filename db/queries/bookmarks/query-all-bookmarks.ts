import { db } from "@/db/db-client";
import { Boomarks } from "@prisma/client";

export const fetchAllBookMarks = (id: string): Promise<any[]> => {
  return db.boomarks.findMany({
    where: {
      userId: id,
    },
    include: {
      post: {
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });
};
