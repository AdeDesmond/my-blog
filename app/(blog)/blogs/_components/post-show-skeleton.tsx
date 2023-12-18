import { Skeleton } from "@/components/ui/skeleton";

export const PostShowSkeleton = () => {
  return (
    <div className="w-[400px] h-[400px]">
      <div className="w-full h-10">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="w-full h-5">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="w-full h-[200px] px-4">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="flex items-center justify-between w-full px-4">
        <Skeleton className="w-[8rem] h-6" />
        <Skeleton className="w-[12rem] h-5" />
      </div>
    </div>
  );
};

export const PostShowSkeletons = () => {
  return (
    <div className="grid grid-cols-1 place-items-center lg:grid-cols-3 md:grid-cols-2 lg:mx-auto md:mx-auto">
      <PostShowSkeleton />
      <PostShowSkeleton />
      <PostShowSkeleton />
      <PostShowSkeleton />
    </div>
  );
};
