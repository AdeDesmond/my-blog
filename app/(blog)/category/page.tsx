import React, { Suspense } from "react";
import { CatForm } from "./_components/form/category-form";
import { CatList } from "./_components/cat-list";
import { fetchCatData } from "@/db/queries/query-data";
import { CatShowLoading } from "./_components/cat-show-loading";

export default function CategoryPage() {
  return (
    <div className="w-full min-h-screen pt-[5rem]">
      <CatForm />
      <div className="px-6 w-full flex items-center justify-center">
        <Suspense fallback={<CatShowLoading />}>
          <CatList fetchData={fetchCatData} />
        </Suspense>
      </div>
    </div>
  );
}
