import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getSession(): Promise<string> {
  const session = await cookies();
  if (!session.toString()) {
    console.log("no cookies");
    redirect("/login");
  }

  return session.toString();
}