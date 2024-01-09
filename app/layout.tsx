import type { Metadata } from "next";
import localfont from "next/font/local";
import "./globals.css";
import { NextAuthProvider } from "./providers/next-auth-provider";
import { ThemeProvider } from "./providers/dark-mode-provider";
import { siteConfig } from "@/config/site";

const fallbackFont = localfont({
  src: "../public/fonts/Roboto-Light.ttf",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/logo.svg",
      href: "/logo.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={fallbackFont.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextAuthProvider>{children}</NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
