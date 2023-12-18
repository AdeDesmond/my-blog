"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const GoBackButton = () => {
  const router = useRouter();
  const onClick = () => {
    router.push("/");
  };
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      size="sm"
      className="flex items-center gap-x-1 group dark:bg-slate-500"
    >
      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-all duration-200" />
      Go Back
    </Button>
  );
};
