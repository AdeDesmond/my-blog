"use client";

import { Trash2Icon } from "lucide-react";
import { CatSubmitButton } from "../../category/_components/form/category-submit-button";
import { useFormState } from "react-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { deleteBlogPost } from "@/actions/delete-blog";
import { useEffect } from "react";
import { toast } from "sonner";

interface DeleteBlogPostId {
  postId: string;
  postTitle: string;
}

export const DeleteBlogPost = ({ postId, postTitle }: DeleteBlogPostId) => {
  const initialState = { errors: {}, message: "" };
  const [state, dispatch] = useFormState(
    deleteBlogPost.bind(null, postId),
    initialState
  );
  useEffect(() => {
    if (state.success) {
      toast.success(`${postTitle} successfully deleted`);
    }
  }, [state, postTitle]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost">
          <Trash2Icon className="w-5 h-5 text-rose-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={dispatch} className="flex flex-col items-center gap-y-2">
          are you sure you want to delete blog with title ?{" "}
          <h2 className="text-sm font-semibold">{postTitle}</h2>
          <CatSubmitButton size="sm" variant="destructive">
            Delete
          </CatSubmitButton>
          {state.errors?._form?.map((error) => (
            <p
              key={error}
              className="text-rose-400 text-muted-foreground font-semibold text-sm"
            >
              {error}
            </p>
          ))}
        </form>
      </PopoverContent>
    </Popover>
  );
};
