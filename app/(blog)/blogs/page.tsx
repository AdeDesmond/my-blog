import React, { Suspense } from "react";
import { PostBlogForm } from "./_components/post-blog-form";
import { fetchCatData } from "@/db/queries/query-data";
import { PostList } from "./_components/post-list";
import { fetchPostsData } from "@/db/queries/posts/query-post";
import { PostShowSkeletons } from "./_components/post-show-skeleton";
export default async function BlogsPage() {
  const catData = await fetchCatData();
  const categoryToBeSelected = catData.map((data) => {
    return data;
  });
  return (
    <div className="w-full pb-[10rem] min-h-screen pt-[4rem]">
      <PostBlogForm catData={categoryToBeSelected} />
      <div className="z-[-999]">
        <Suspense fallback={<PostShowSkeletons />}>
          <PostList fetchData={fetchPostsData} />
        </Suspense>
      </div>
    </div>
  );
}
