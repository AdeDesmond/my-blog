import { PostWithData } from "@/db/queries/posts/query-post";
import Image from "next/image";
import { DisplayBlogCardItem } from "./display-blog-card-item";

interface DisplayCardProps {
  fetchData: () => Promise<PostWithData[]>;
}

export const DisplayBlogCard = async ({ fetchData }: DisplayCardProps) => {
  const posts = await fetchData();
  const firstThreePosts = posts
    .slice(1, 4)
    .map((post) => <DisplayBlogCardItem key={post.id} post={post} />);
  return (
    <div className="grid grid-cols-1 place-items-center mr-5 lg:grid-cols-3 md:grid-cols-2 lg:-mt-[4.6rem] ">
      {firstThreePosts}
    </div>
  );
};
