"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

interface CatSubmitButtonProps {
  children: React.ReactNode;
}

export const CatSubmitButton = ({ children }: CatSubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} size={"sm"} className="">
      {children}
    </Button>
  );
};
