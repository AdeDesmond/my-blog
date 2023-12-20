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
    <div className="w-full mb-[10rem]">
      <PostBlogForm catData={categoryToBeSelected} />
      <div>
        <Suspense fallback={<PostShowSkeletons />}>
          <PostList fetchData={fetchPostsData} />
        </Suspense>
      </div>
    </div>
  );
}
