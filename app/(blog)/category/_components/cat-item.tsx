"use client";

import { Button } from "@/components/ui/button";
import { ElementRef, useCallback, useEffect, useRef, useState } from "react";
import { CatEditForm } from "./form/cat-edit-form";
import { X } from "lucide-react";
import { useFormState } from "react-dom";
import { deleteCat } from "@/actions/delete-cat";
import { toast } from "sonner";

interface CatItemsProps {
  data: {
    id: string;
    category: string;
    created_at: Date;
    updated_at: Date;
  };
}

export const CatItems = ({ data }: CatItemsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<ElementRef<"input">>(null);
  const onEditCategory = useCallback(() => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  }, []);
  const initialState = { errors: {}, message: "" };
  const [state, dispatch] = useFormState(
    deleteCat.bind(null, data.id),
    initialState
  );
  useEffect(() => {
    if (state.success) {
      toast.success("successfully deleted");
    }
  }, [state]);
  return (
    <div
      role="button"
      className="border border-neutral-400 px-2 py-1 rounded-lg sm:max-w-[300px] lg:max-w-[400px] md:max-w-[350px] mt-2 mb-2 cursor-pointer flex justify-between items-center gap-x-1 mx-auto font-semibold text-muted-foreground"
      onClick={onEditCategory}
    >
      {isEditing ? (
        <CatEditForm
          ref={inputRef}
          category={data.category}
          id={data.id}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      ) : (
        data.category
      )}
      <form action={dispatch} onClick={(e) => e.stopPropagation()}>
        <Button size="sm" variant="destructive" className="">
          <X className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
};
