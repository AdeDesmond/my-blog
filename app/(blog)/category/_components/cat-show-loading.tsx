import { Skeleton } from "@/components/ui/skeleton";

export const CatShowLoading = () => {
  return (
    <div className="lg:max-w-[500px] sm:max-w-[300px] md:max-w-[350px] h-10 flex flex-col items-center gap-y-1">
      <Skeleton className="w-full h-full" />
      <Skeleton className="w-full h-full" />
      <Skeleton className="w-full h-full" />
      <Skeleton className="w-full h-full" />
      <Skeleton className="w-full h-full" />
    </div>
  );
};
