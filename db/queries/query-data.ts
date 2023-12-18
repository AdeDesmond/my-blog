import { db } from "../db-client";
import { Category } from "@prisma/client";

export type CategoryData = Category[];

export const fetchCatData = (): Promise<CategoryData> => {
  return db.category.findMany({
    orderBy: {
      category: "desc",
    },
  });
};
