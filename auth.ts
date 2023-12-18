import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db/db-client";

const CLIENT_ID = process.env.AUTH_GITHUB_ID;
const CLIENT_SECRET = process.env.AUTH_GITHUB_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  throw new Error("Github Connection error");
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    GithubProvider({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    }),
  ],
  callbacks: {
    //usually not needed, here we are fixing a bug in the nextauth
    async session({ session, user }: any) {
      if (session && user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});
