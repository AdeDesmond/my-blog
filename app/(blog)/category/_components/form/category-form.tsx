"use client";
import { toast } from "sonner";
import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CatSubmitButton } from "./category-submit-button";
import { createCategory } from "@/actions/create-cat";
import { useEffect, useRef, ElementRef } from "react";

export const CatForm = () => {
  const initialState = { errors: {}, message: "" };
  const [state, dispatch] = useFormState(createCategory, initialState);
  const formRef = useRef<ElementRef<"form">>(null);
  useEffect(() => {
    if (state.success) {
      setTimeout(() => {
        formRef.current?.reset();
        toast.success("category created successfully");
      });
    }
  }, [state]);
  return (
    <Dialog>
      <DialogTrigger className="ml-[47rem]" asChild>
        <Button size="sm">Create Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] lg:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <form
            action={dispatch}
            ref={formRef}
            className="flex flex-col gap-y-2"
          >
            <Label
              htmlFor="category"
              className="font-semibold text-muted-foreground mb-1"
            >
              Category
            </Label>
            <Input
              type="text"
              name="category"
              id="category"
              className="placeholder:text-sm"
              placeholder="Enter your category"
            />
            {state.errors?.category &&
              state.errors?.category?.map((error) => (
                <p key={error} className="text-rose-400 text-sm font-semibold">
                  {error}
                </p>
              ))}
            {state.errors?._form &&
              state.errors._form.map((error) => (
                <p key={error} className="font-semibold text-sm text-rose-400">
                  {error}
                </p>
              ))}
            <CatSubmitButton>Submit</CatSubmitButton>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
