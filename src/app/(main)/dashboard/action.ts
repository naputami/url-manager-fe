'use server';
import { linkService } from "@/applications/instance";
import { handleAction } from "@/utils/action-handler";
import { getSession } from "@/utils/session";

export async function getLatestLink() {
    const session = await getSession();
    return await handleAction(() => linkService.getLatestLink(session));
}