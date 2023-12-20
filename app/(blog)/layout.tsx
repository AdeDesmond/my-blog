import { Toaster } from "sonner";

interface BlogLayoutProps {
  children: React.ReactNode;
}

import React from "react";
import { Header } from "./_components/header";
import { Footer } from "./_components/footer";

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="mt-16 w-full ">
      <Header />
      <Toaster />
      {children}
      <Footer />
    </div>
  );
}
