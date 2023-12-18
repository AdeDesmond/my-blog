import { Button } from "@/components/ui/button";
import { BookCheck, BookHeart } from "lucide-react";

export const BookMarkBlogItem = () => {
  return (
    <div className="flex items-center justify-center">
      <Button size="sm" variant="ghost">
        <BookHeart className="h-5 w-5 text-muted-foreground" />
      </Button>
    </div>
  );
};
//<BookCheck className="h-5 w-5" />
