"use server"
import { authService } from "@/applications/instance";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await authService.login(email, password);
    console.log(res);

    if (res.success) {
        redirect("/dashboard");
    }

    return res;

}