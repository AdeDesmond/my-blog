import React from "react";
import { SearchInput } from "./_components/search-input";
import { HighLightBlog } from "./_components/high-light-blog";
import { fetchPostsData } from "@/db/queries/posts/query-post";
import { DisplayBlogCard } from "./_components/display-blog-card";
import { Separator } from "@/components/ui/separator";
import { AllBlogPosts } from "./_components/all-blogs";

export default function BlogHomePage() {
  return (
    <main className="w-full min-h-screen">
      <div className="flex flex-col items-center gap-y-3">
        <h1 className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          Our Blogs
        </h1>
        <p className="text-muted-foreground font-semibold text-sm">
          A center for all our resources & insights
        </p>
        <SearchInput />
      </div>
      <div className="w-full flex items-center justify-center mt-4">
        <HighLightBlog fetchData={fetchPostsData} />
      </div>
      <div className="lg:max-w-[1200px] md:max-w-[800px] mx-auto mt-20">
        <DisplayBlogCard fetchData={fetchPostsData} />
        <Separator />
        <p className="font-medium text-muted-foreground text-sm mt-3 mb-2 ml-4">
          All Blogs Posts
        </p>
        <AllBlogPosts fetchData={fetchPostsData} />
      </div>
    </main>
  );
}
