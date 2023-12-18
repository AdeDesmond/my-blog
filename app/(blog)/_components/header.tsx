import { Logo } from "@/components/logo";
import { NavBar } from "./nav-bar";
import { HeaderAuth } from "./header-auth";
import { MobileSideBar } from "./mobile-nav";
import { ModeToggle } from "@/components/mode-toggle";

export const Header = () => {
  return (
    <header className="w-full h-14 border-b border-b-neutral-300 fixed top-0 flex items-center justify-between px-6 z-1000 bg-white ">
      <MobileSideBar />
      <div className="w-full lg:flex md:flex items-center justify-between hidden ">
        <Logo />
        <NavBar />
        <div className="flex items-center gap-x-2">
          <ModeToggle />
          <HeaderAuth />
        </div>
      </div>
    </header>
  );
};
