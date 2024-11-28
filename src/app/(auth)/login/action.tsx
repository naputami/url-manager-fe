"use server"
import { authService } from "@/applications/instance";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function loginAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = await cookies()

    const res = await authService.login(email, password);

    if (res.success) {
        cookieStore.set("session", res.data.sessionId as string, { secure: true })
        redirect("/categories");
    }

    return res;

}