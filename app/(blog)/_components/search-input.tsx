"use client";

import { search } from "@/actions/search-blog";
import { SearchIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

export const SearchInput = () => {
  const searchParams = useSearchParams();
  return (
    <div className="">
      <form
        action={search}
        className=" bg-white w-[300px] flex items-center border border-neutral-400 group rounded-lg pl-2 lg:w-[500px] md:w-[400px] overflow-hidden"
      >
        <SearchIcon className="h-5 w-5 text-rose-400" />
        <input
          type="text"
          name="term"
          id="term"
          placeholder="Search our blogs by tops and keywords"
          className="outline-none placeholder:text-sm placeholder:font-semibold px-3 py-2 focus:ring-0 focus:ring-slate-900 w-full"
          defaultValue={searchParams.get("term") || " "}
        />
      </form>
    </div>
  );
};
