"use client";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Smile } from "lucide-react";
import { signIn } from "@/actions/sign-in";
import { signOut } from "@/actions/sign-out";

export const HeaderAuth = () => {
  const sessions = useSession();
  let authContent;
  if (sessions.status === "loading") {
    authContent = null;
  } else if (sessions.data?.user) {
    authContent = (
      <div className=" flex flex-col items-center gap-y-1 lg:flex-row md:flex-row lg:gap-x-1 ">
        <Avatar>
          <AvatarImage src={sessions.data.user.image || ""} />
          <AvatarFallback>
            <Smile className="w-5 h-5" />
          </AvatarFallback>
        </Avatar>
        <form action={signOut}>
          <Button variant="outline" size="sm">
            Sign Out
          </Button>
        </form>
      </div>
    );
  } else {
    authContent = (
      <div className=" flex flex-col items-center gap-y-1 lg:flex-row md:flex-row lg:gap-x-1 ">
        <form action={signIn}>
          <Button size="sm">SignIn</Button>
        </form>
        <form action={signIn}>
          <Button variant="outline" size="sm">
            SignUp
          </Button>
        </form>
      </div>
    );
  }
  return authContent;
};
