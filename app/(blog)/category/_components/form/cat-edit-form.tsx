"use client";
import { useFormState } from "react-dom";
import { Input } from "@/components/ui/input";
import { CatSubmitButton } from "./category-submit-button";
import { forwardRef, useCallback, useEffect } from "react";
import { updateCat } from "@/actions/update-cat";
import { toast } from "sonner";

interface CatEditFormProps {
  category: string;
  id: string;
  setIsEditing: (condition: boolean) => void;
  isEditing: boolean;
}

export const CatEditForm = forwardRef<HTMLInputElement, CatEditFormProps>(
  ({ category, id, isEditing, setIsEditing }, ref) => {
    const initialState = { errors: {}, message: "" };
    const [state, dispatch] = useFormState(
      updateCat.bind(null, id),
      initialState
    );

    const disabledEditing = useCallback(() => {
      setIsEditing(false);
    }, [setIsEditing]);

    useEffect(() => {
      if (state.success) {
        toast.success("category updated");
        disabledEditing();
      }
    }, [state, disabledEditing]);
    return (
      <form action={dispatch} className="flex items-center gap-x-2">
        <Input
          ref={ref}
          className="h-7"
          type="text"
          name="category"
          id="category"
          defaultValue={category}
        />
        <CatSubmitButton>Edit Category</CatSubmitButton>
      </form>
    );
  }
);

CatEditForm.displayName = "CatEditForm";
