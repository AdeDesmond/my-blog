import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Facebook, InstagramIcon, MessageCircle, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="h-20 w-full bg-slate-900 fixed bottom-0 px-6 ">
      <div className="flex items-center justify-between mt-3 mb-4">
        <Logo />
        <div className="flex items-center gap-x-1 text-slate-300 pr-3">
          <Facebook className="w-4 h-4 cursor-pointer" />
          <MessageCircle className="w-4 h-4 cursor-pointer" />
          <Twitter className="w-4 h-4 cursor-pointer" />
          <InstagramIcon className="w-4 h-4 cursor-pointer" />
        </div>
      </div>
      <div className="hidden md:flex lg:flex items-center justify-between ">
        <div className="text-slate-400 text-sm flex items-center gap-x-1">
          Copywrite@<span>{new Date().getFullYear()}</span> <span>My-blog</span>
          <span>All rights reserve</span>
        </div>
        <div className="flex items-center gap-x-1">
          <Button variant="ghost" size="sm" className="text-slate-400">
            Privary Policy
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-400">
            Terms of Service
          </Button>
        </div>
      </div>
    </footer>
  );
};
