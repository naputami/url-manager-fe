"use server"
import { authService } from "@/applications/instance";
import { cookies } from "next/headers";
import { handleAction } from "@/utils/action-handler";

export async function loginAction(_prevstate: unknown, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = await cookies()

    const res = await handleAction(() => authService.login(email, password));

    if (res.success) {
        cookieStore.set("session", res.data.sessionId as string, { secure: true });
    }

    return res;

}