import { cache } from "react";
import { db } from "../db-client";
import { Category } from "@prisma/client";

export type CategoryData = Category[];

export const fetchCatData = cache((): Promise<CategoryData> => {
  return db.category.findMany({
    orderBy: {
      category: "desc",
    },
  });
});
