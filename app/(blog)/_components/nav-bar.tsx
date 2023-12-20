"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavBar = () => {
  const pathName = usePathname();
  return (
    <nav>
      <ul className=" flex flex-col gap-y-2 mb-2 md:flex-row lg:flex-row lg:gap-x-2 lg:items-center md:items-center lg:mt-2">
        <Button
          className={cn(
            pathName === "/"
              ? " bg-gradient-to-tr from-purple-500 to-pink-500 text-white transition-all"
              : null,
            " dark:border-none"
          )}
          variant="outline"
          size="sm"
          asChild
        >
          <Link className="" href="/">
            Home
          </Link>
        </Button>

        <Button
          className={cn(
            pathName === "/bookmark"
              ? " bg-gradient-to-tr from-purple-500 to-pink-500 text-white transition-all"
              : null,
            " dark:border-none"
          )}
          variant="outline"
          size="sm"
          asChild
        >
          <Link className="" href="/bookmark ">
            Bookmark
          </Link>
        </Button>

        <Button
          className={cn(
            pathName.includes("/blogs")
              ? " bg-gradient-to-tr from-purple-500 to-pink-500 text-white transition-all"
              : null,
            " dark:border-none"
          )}
          variant="outline"
          size="sm"
          asChild
        >
          <Link className="" href="/blogs">
            Blogs
          </Link>
        </Button>

        <Button
          className={cn(
            pathName === "/category"
              ? " bg-gradient-to-tr from-purple-500 to-pink-500 text-white transition-all"
              : null,
            " dark:border-none"
          )}
          variant="outline"
          size="sm"
          asChild
        >
          <Link className="" href="/category">
            Category
          </Link>
        </Button>

        <Button
          className={cn(
            pathName === "/about"
              ? " bg-gradient-to-tr from-purple-500 to-pink-500 text-white transition-all"
              : null,
            " dark:border-none"
          )}
          variant="outline"
          size="sm"
          asChild
        >
          <Link className="" href="/about">
            About Us
          </Link>
        </Button>

        <Button
          className={cn(
            pathName === "/contact"
              ? " bg-gradient-to-tr from-purple-500 to-pink-500 text-white transition-all"
              : null,
            " dark:border-none"
          )}
          variant="outline"
          size="sm"
          asChild
        >
          <Link className="" href="/contact">
            Contact Us
          </Link>
        </Button>
      </ul>
    </nav>
  );
};
