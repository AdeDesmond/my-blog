"use client";
import { useFormState } from "react-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSession } from "next-auth/react";
import { createComment } from "@/actions/create-comment";
import { CatSubmitButton } from "@/app/(blog)/category/_components/form/category-submit-button";
import { X } from "lucide-react";
import { ElementRef, useEffect, useRef } from "react";

interface CreateCommentFormProps {
  title?: React.ReactNode;
  parentId?: string;
  postId: string;
}
export const CreateCommentForm = ({
  title,
  parentId,
  postId,
}: CreateCommentFormProps) => {
  const { data: userData } = useSession();
  const closeRef = useRef<ElementRef<"button">>(null);
  const initialState = { errors: {}, message: "" };
  const [state, dispatch] = useFormState(
    createComment.bind(null, { postId, parentId }),
    initialState
  );

  useEffect(() => {
    if (state.success) {
      setTimeout(() => {
        closeRef.current?.click();
      });
    }
  }, [state]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm">{title}</Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={5}
        side="bottom"
        className="max-w-[400px] lg:max-w-[800px] md:max-w-[600px]"
      >
        <form
          action={dispatch}
          className="max-w-[450px] flex flex-col gap-y-2 relative"
        >
          <PopoverClose asChild>
            <Button
              ref={closeRef}
              className="absolute -top-3 -right-2"
              size="sm"
              variant="ghost"
            >
              <X className="h-5 w-5" />
            </Button>
          </PopoverClose>
          <div className="flex items-center gap-x-1">
            <Avatar className="h-6 w-6">
              <AvatarImage src={userData?.user?.image || ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-sm text-muted-foreground font-semibold">
              {userData?.user?.name}
            </p>
          </div>
          <Input
            type="text"
            name="content"
            id="content"
            placeholder="Say something about the blog post"
            className="ml-5 max-w-[340px]"
          />
          <CatSubmitButton>Send</CatSubmitButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};
