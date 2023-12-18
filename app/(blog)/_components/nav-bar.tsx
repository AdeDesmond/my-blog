import { Button } from "@/components/ui/button";
import Link from "next/link";

export const NavBar = () => {
  return (
    <nav>
      <ul className=" flex flex-col gap-y-2 mb-2 md:flex-row lg:flex-row lg:gap-x-2 lg:items-center md:items-center lg:mt-2">
        <Button variant="outline" size="sm" asChild>
          <Link className="" href="/">
            Home
          </Link>
        </Button>

        <Button variant="outline" size="sm" asChild>
          <Link className="" href="/bookmark">
            Bookmark
          </Link>
        </Button>

        <Button variant="outline" size="sm" asChild>
          <Link className="" href="/blogs">
            Blogs
          </Link>
        </Button>

        <Button variant="outline" size="sm" asChild>
          <Link className="" href="/category">
            Category
          </Link>
        </Button>

        <Button variant="outline" size="sm" asChild>
          <Link className="" href="/about">
            About Us
          </Link>
        </Button>

        <Button variant="outline" size="sm" asChild>
          <Link className="" href="/contact">
            Contact Us
          </Link>
        </Button>
      </ul>
    </nav>
  );
};
