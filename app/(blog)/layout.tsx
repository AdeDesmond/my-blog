import { Toaster } from "sonner";

interface BlogLayoutProps {
  children: React.ReactNode;
}

import React from "react";
import { Header } from "./_components/header";
import { Footer } from "./_components/footer";

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="mt-[3.3rem] w-full bg-[url('https://www.transparenttextures.com/patterns/escheresque.png')] dark:bg-[url('https://www.transparenttextures.com/patterns/diagmonds.png')] ">
      <Header />
      <Toaster />
      {children}
      <Footer />
    </div>
  );
}
