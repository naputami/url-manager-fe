"use server";
import { getSession } from "@/utils/session";
import { authService } from "@/applications/instance";
import { cookies } from "next/headers";

export async function logOutAction() {
    const cookie = await getSession();

    const res = await authService.logout(cookie);

    if(res.success){
        (await cookies()).delete('session');
    }

    return res.success;
}