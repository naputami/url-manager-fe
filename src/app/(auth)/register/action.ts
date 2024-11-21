"use server"
import { authService } from "@/applications/instance";

export async function registerAction(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await authService.register(name, email, password);

    return res;
}