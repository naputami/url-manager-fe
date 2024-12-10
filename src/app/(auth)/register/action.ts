"use server"
import { authService } from "@/applications/instance";
import { handleAction } from "@/utils/action-handler";

export async function registerAction(_prevState: unknown, formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    return await handleAction(() =>  authService.register(name, email, password));
}