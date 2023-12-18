import { Button } from "@/components/ui/button";
import { fetchPostWithFullContent } from "@/db/queries/posts/query-fullcontent";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { BlogContent } from "../_components/blog-content";
import { GoBackButton } from "../_components/go-back-button";
import { CreateCommentForm } from "../_components/comment-form/create-form-comment";
import { Separator } from "@/components/ui/separator";
import { CommentsList } from "../_components/comment-form/comment-list";

interface BlogPageContentIdProps {
  params: {
    id: string;
  };
}

async function BlogContentIdPage({ params }: BlogPageContentIdProps) {
  const post = await fetchPostWithFullContent(params.id);
  return (
    <section className="w-full ">
      <div className="w-full bg-rose-200 h-14 -mt-2 flex items-center justify-start ">
        <GoBackButton />
      </div>
      <div className="w-full mt-10 lg:max-w-[1000px] md:max-w-[700px] mx-auto">
        <BlogContent post={post} />
        <Separator className="mt-4" />
        <CommentsList postId={params.id} />
        <div className="mt-10 mb-10">
          <CreateCommentForm title="Leave a comment" postId={params.id} />
        </div>
      </div>
    </section>
  );
}

export default BlogContentIdPage;
