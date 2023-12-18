"use server";
import * as authAction from "@/auth";
export async function signOut() {
  return authAction.signOut();
}
