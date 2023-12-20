import { Skeleton } from "@/components/ui/skeleton";

export const HighLightLoadingSkeleton = () => {
  return (
    <div className="max-w-[400px] flex flex-col lg:flex-row md:flex-row">
      <div className="w-full h-[10rem]">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="w-[80%] h-10">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="w-full flex items-center gap-x-2">
        <div className="w-[20px] h-[15px]">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="w-[20px] h-[10px]">
          <Skeleton className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};
