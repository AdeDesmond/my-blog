"use server";
import * as authAction from "@/auth";
export async function signIn() {
  return authAction.signIn("github");
}
