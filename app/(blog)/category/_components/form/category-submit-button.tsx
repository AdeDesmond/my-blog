"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

interface CatSubmitButtonProps {
  children: React.ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
}

export const CatSubmitButton = ({
  children,
  size,
  variant,
}: CatSubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      size={size || "sm"}
      variant={variant}
      className=""
    >
      {children}
    </Button>
  );
};
