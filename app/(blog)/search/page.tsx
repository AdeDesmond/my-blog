import { fetchPostsWithSearchTerm } from "@/db/queries/posts/query-search";
import { redirect } from "next/navigation";
import { PostList } from "../blogs/_components/post-list";

interface SearchPageProps {
  searchParams: {
    term: string;
  };
}

async function SearchPage({ searchParams }: SearchPageProps) {
  const { term } = searchParams;
  if (!term) {
    redirect("/");
  }
  return (
    <div className="min-h-screen pt-10">
      <PostList fetchData={() => fetchPostsWithSearchTerm(term)} />
    </div>
  );
}

export default SearchPage;
