import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PostWithData } from "@/db/queries/posts/query-post";
import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  key: string;
  post: PostWithData;
}

export const DisplayBlogCardItem = ({ post }: CardProps) => {
  return (
    <div className="max-w-[350px] mb-3 lg:mt-8 -md:mt-20 cursor-pointer">
      <div className="max-w-[400px]">
        <Link href={`/blogs/blogcontent/${post.id}`}>
          <Image
            src={post.image}
            alt="blog card"
            width={350}
            height={350}
            className="object-cover rounded-lg"
          />
        </Link>
      </div>
      <div className="max-w-[350px] ">
        <h2 className="text-xl font-bold text-neutral-800 mt-4 mb-2 line-clamp-1">
          {post.title}
        </h2>
        <p className="text-sm text-neutral-600 mb-2 line-clamp-1">
          {post.subtitle}
        </p>
        <div className="flex items-center">
          <div className="flex items-center gap-x-1 justify-center">
            <Avatar className="w-5 h-5">
              <AvatarImage src={post.user.image || ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-muted-foreground text-xs font-semibold">
              {post.user.name}
            </p>
          </div>
          <span>
            <Dot className="h-4 w-4 text-muted-foreground font-semibold" />
          </span>
          <p className="text-muted-foreground text-xs">
            {new Date(post.create_at).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};
