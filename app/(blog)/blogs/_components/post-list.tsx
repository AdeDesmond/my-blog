import { PostWithData } from "@/db/queries/posts/query-post";
import { PostItemCard } from "./post-item-card";
import { DeleteBlogPost } from "./delete-blog";

interface PostListProps {
  fetchData: () => Promise<PostWithData[]>;
}

export const PostList = async ({ fetchData }: PostListProps) => {
  const posts = await fetchData();
  const renderedPosts = posts.map((post) => (
    <PostItemCard
      key={post.id}
      post={post}
      deleteButton={<DeleteBlogPost postId={post.id} postTitle={post.title} />}
    />
  ));
  return (
    <div className="grid grid-cols-1 gap-1 place-items-center mt-2 lg:grid-cols-3 md:grid-cols-2 lg:max-w-[80%] lg:mx-auto -z-50">
      {renderedPosts}
    </div>
  );
};
