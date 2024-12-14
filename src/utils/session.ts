"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getSession(): Promise<string> {
  const session = (await cookies()).get("session");
  if (!session?.value) {
    redirect("/login");
  }
  return `session=${session.value}`;
}