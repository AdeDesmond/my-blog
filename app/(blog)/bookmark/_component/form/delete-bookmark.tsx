"use client";

import { deleteBookMark } from "@/actions/delete-bookmark";
import { CatSubmitButton } from "@/app/(blog)/category/_components/form/category-submit-button";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

interface DeleteBookMarkProps {
  bookmarkedId: string;
}

export const DeleteBookMark = ({ bookmarkedId }: DeleteBookMarkProps) => {
  const initialState = { errors: {}, message: "" };
  const [state, dispatch] = useFormState(
    deleteBookMark.bind(null, bookmarkedId),
    initialState
  );
  useEffect(() => {
    if (state.success) {
      toast.success("bookmark successfully deleted");
    }
  }, [state]);
  return (
    <form action={dispatch} className="absolute top-0 right-0">
      <CatSubmitButton size={"sm"} variant={"ghost"}>
        <Trash2Icon className="w-5 h-5" />
      </CatSubmitButton>
    </form>
  );
};
