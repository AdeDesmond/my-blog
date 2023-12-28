import React from "react";
import { ContactForm } from "./_components/contact-form";

export default function ContactUsPage() {
  return (
    <div className="max-w-[500px] lg:max-w-[800px] md:max-w-[700px] px-2 mx-auto mb-[5rem] min-h-screen pt-[5rem] pb-[5rem]">
      <ContactForm />
    </div>
  );
}
