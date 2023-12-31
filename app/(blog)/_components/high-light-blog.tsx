import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PostWithData } from "@/db/queries/posts/query-post";
import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface HighLightBlogProps {
  fetchData: () => Promise<PostWithData[]>;
}
//change the index to get most recent blogs
export const HighLightBlog = async ({ fetchData }: HighLightBlogProps) => {
  const highLight = await fetchData();
  const lastPosted = highLight.at(0);
  return (
    <div className="max-w-[400px] flex flex-col items-center px-4 mt-3 justify-center lg:flex-row lg:max-w-[750px] md:flex-row md:max-w-[700px] md:gap-x-1 cursor-pointer">
      <div className="w-full ">
        <Link href={`/blogs/blogcontent/${lastPosted?.id}`}>
          <Image
            src={lastPosted?.image || ""}
            alt="blog image"
            width={350}
            height={350}
            className="object-cover rounded-lg cursor-pointer hover:scale-105 hover:shadow-lg focus:scale-95 focus:shadow-sm transition-all duration-250 ease-in-out hover:-translate-x-3"
          />
        </Link>
      </div>
      <div className="w-full mt-3">
        <h2 className="text-xl font-semibold dark:text-slate-200">
          {lastPosted?.title}
        </h2>
        <div className="flex items-center gap-x-1 w-full">
          <Avatar className="-z-50">
            <AvatarImage src={lastPosted?.user.image || ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex items-center">
            <p className="text-sm text-muted-foreground font-semibold">
              {lastPosted?.user.name}
            </p>
            <span>
              <Dot className="w-4 h-4" />
            </span>
            <p className="text-muted-foreground text-xs">
              {new Date(lastPosted?.create_at || Date.now()).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
