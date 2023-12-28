import { signIn } from "@/actions/sign-in";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RocketIcon } from "lucide-react";

export function AlertDemo() {
  return (
    <Alert className="max-w-[500px]">
      <RocketIcon className="h-4 w-4" />
      <AlertTitle className="text-rose-400">Heads up!</AlertTitle>
      <AlertDescription className="flex items-center gap-x-2">
        You have to be logged in to perform this action{" "}
        <form action={signIn}>
          <Button size="sm">sign in</Button>
        </form>
      </AlertDescription>
    </Alert>
  );
}
