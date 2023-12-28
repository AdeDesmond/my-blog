"use client";

import { createBookMark } from "@/actions/create-bookmark";
import { Button } from "@/components/ui/button";
import { BookCheck, BookHeart } from "lucide-react";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

interface BookMarkProps {
  postId: string;
  isBookMark?: boolean;
  bookMarkedPostId?: string;
  onBookMark?: (add: boolean) => void;
}

export const BookMarkBlogItem = ({
  postId,
  isBookMark,
  bookMarkedPostId,
}: BookMarkProps) => {
  const initialAction = { errors: {}, message: "" };
  const [state, dispatch] = useFormState(
    createBookMark.bind(null, postId),
    initialAction
  );
  useEffect(() => {
    if (state.success) {
      toast.success("bookmark successful");
    }
  }, [state]);
  return (
    <div className="flex items-center justify-center">
      <form action={dispatch}>
        <Button size="sm" variant="ghost">
          {state.success ? (
            <BookCheck className="h-5 w-5 text-muted-foreground" />
          ) : (
            <BookHeart className="h-5 w-5 text-muted-foreground" />
          )}
        </Button>
      </form>
    </div>
  );
};
//
