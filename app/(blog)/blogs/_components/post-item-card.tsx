"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface PostItemCardProps {
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

  deleteButton?: React.ReactNode;
}

export const PostItemCard = ({ post, deleteButton }: PostItemCardProps) => {
  const pathName = usePathname();
  const changeRoutes = pathName === "/bookmark" ? "blogcontent" : "edit";
  return (
    <Card className="w-[400px] relative group">
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
        {deleteButton}
      </div>
      <CardHeader>
        <Link href={`/blogs/${changeRoutes}/${post.id}`}>
          <CardTitle className="text-xl line-clamp-1">{post.title}</CardTitle>
        </Link>
        <CardDescription className="line-clamp-1">
          {post.subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-[400px] ">
          <Link href={`/blogs/${changeRoutes}/${post.id}`}>
            <Image
              src={post.image}
              alt="blog image"
              height={350}
              width={350}
              className="object-cover rounded-lg cursor-pointer"
            />
          </Link>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-x-1">
          <Avatar>
            <AvatarImage src={post.user.image || ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Label className="text-muted-foreground text-sm">
            {post.user.name}
          </Label>
        </div>
        <p className="text-muted-foreground text-xs font-semibold">
          {new Date(post.create_at).toLocaleString()}
        </p>
      </CardFooter>
    </Card>
  );
};
