import { db } from "@/db/db-client";
import { Boomarks } from "@prisma/client";

export const fetchBookMarkedPostId = (id: string): Promise<any> => {
  return db.boomarks.findUnique({
    where: {
      id,
    },
  });
};
