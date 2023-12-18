"use client";

"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMobileSidebar } from "@/hooks/use-mobile-nav";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NavBar } from "./nav-bar";
import { HeaderAuth } from "./header-auth";
import { Logo } from "@/components/logo";

export const MobileSideBar = function () {
  const pathName = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const onOpen = useMobileSidebar((state) => state.onOpen);
  const onClose = useMobileSidebar((state) => state.onClose);
  const isOpen = useMobileSidebar((state) => state.isOpen);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    onClose();
  }, [pathName, onClose]);
  if (!isMounted) return null;
  return (
    <>
      <Button
        onClick={onOpen}
        className="block md:hidden dark:bg-slate-600"
        variant={"ghost"}
        size={"sm"}
      >
        <Menu className="w-4 h-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side={"left"} className="p-2 pt-10">
          <div className="flex flex-col items-center justify-between ">
            <div className="mb-10">
              <Logo />
            </div>
            <NavBar />
            <HeaderAuth />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
