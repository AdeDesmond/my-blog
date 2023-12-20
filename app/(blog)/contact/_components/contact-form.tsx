import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CatSubmitButton } from "../../category/_components/form/category-submit-button";

export const ContactForm = () => {
  return (
    <div className="mt-28">
      <form action="" className="flex flex-col gap-y-2 items-start w-full">
        <h2 className="text-xl font-semibold self-center mb-5 ">
          Welcome to contact us!
        </h2>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
        />
        <Label htmlFor="email">Email</Label>
        <Input
          type="text"
          name="email"
          id="email"
          placeholder="Enter your email address"
        />
        <Label htmlFor="message">Message</Label>
        <Textarea name="message" id="message" placeholder="Write to us" />
        <CatSubmitButton>Send your message</CatSubmitButton>
      </form>
    </div>
  );
};
