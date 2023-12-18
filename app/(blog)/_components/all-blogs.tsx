import { PostWithData } from "@/db/queries/posts/query-post";
import { DisplayBlogCardItem } from "./display-blog-card-item";

interface DisplayCardProps {
  fetchData: () => Promise<PostWithData[]>;
}

export const AllBlogPosts = async ({ fetchData }: DisplayCardProps) => {
  const posts = await fetchData();
  const renderedPosts = posts
    .slice(4, 10)
    .map((post) => <DisplayBlogCardItem key={post.id} post={post} />);
  return (
    <div className="grid grid-cols-1 place-items-center mr-5 lg:grid-cols-3 md:grid-cols-2 -mt-5">
      {renderedPosts}
    </div>
  );
};
