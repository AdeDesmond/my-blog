import { auth } from "@/auth";
import { fetchAllBookMarks } from "@/db/queries/bookmarks/query-all-bookmarks";
import React from "react";
import { PostItemCard } from "../blogs/_components/post-item-card";
import { BookMarkBlogItem } from "../blogs/blogcontent/_components/bookmark-blog";
import { DeleteBookMark } from "./_component/form/delete-bookmark";
import { AlertDemo } from "./_component/form/login-dialog";

export default async function BookMarkPage() {
  const session = await auth();
  if (!session?.user || !session) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <AlertDemo />
      </div>
    );
  }
  const bookmarkedData = await fetchAllBookMarks(session.user.id);
  const renderedBookMarkedBlogs = bookmarkedData.map((post) => {
    const data = post.post;
    return (
      <PostItemCard
        key={post.id}
        post={data}
        deleteButton={<DeleteBookMark bookmarkedId={post.id} />}
      />
    );
  });

  const bookMarkState = bookmarkedData.map((bookmark) => {
    return (
      <BookMarkBlogItem
        key={bookmark.id}
        bookMarkedPostId={bookmark.post.id}
        isBookMark={bookmark.isBookMarked}
        postId="test"
      />
    );
  });
  return (
    <div className="grid place-items-center lg:grid-cols-3 md:grid-cols-2 lg:max-w-[1500px] mx-auto min-h-screen gap-2 pt-[5rem] pb-[10rem]">
      {renderedBookMarkedBlogs}
      <div className="hidden" hidden>
        {bookMarkState}
      </div>
    </div>
  );
}
