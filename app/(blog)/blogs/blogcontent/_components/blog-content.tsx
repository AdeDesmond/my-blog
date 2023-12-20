import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dot } from "lucide-react";
import Image from "next/image";
import { BookMarkBlogItem } from "./bookmark-blog";

interface BlogContentProps {
  post: {
    id: string;
    title: string;
    subtitle: string;
    content: string;
    color: string;
    image: string;
    categoryId: string;
    userId: string;
    create_at: Date;
    updated_at: Date;
    user: {
      name: string | null;
      image: string | null;
    };
  };
}

export const BlogContent = ({ post }: BlogContentProps) => {
  return (
    <div>
      <BookMarkBlogItem />
      <h1 className="mb-4 text-center text-xl font-bold  ">{post.title}</h1>
      <div className="flex items-center mb-5 justify-center">
        <div className="flex items-center gap-x-1">
          <Avatar className="h-4 w-4">
            <AvatarImage src={post.user.image || ""} className="-z-10" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-xs text-muted-foreground font-semibold">
            {post.user.name}
          </p>
        </div>
        <span>
          <Dot className="h-5 w-5 text-muted-foreground " />
        </span>
        <p className="text-xs text-muted-foreground font-semibold">
          {new Date(post.create_at).toLocaleString()}
        </p>
      </div>
      <div className="w-full h-[20rem] relative mb-5 ">
        <Image
          src={post.image}
          alt="blog image"
          fill
          className="object-fit lg:object-cover md:object-cover -z-10 lg:rounded-lg md:rounded-lg"
        />
      </div>
      <p className=" first-letter:uppercase first-letter:font-bold first-letter:text-2xl px-4 first-line:font-semibold dark:text-slate-500">
        {post.content}
      </p>
    </div>
  );
};
