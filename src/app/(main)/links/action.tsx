"use server";

import { linkService } from "@/applications/instance";
import { getSession } from "@/utils/session";

export async function getAllLinkAction() {
    const session = await getSession();
    const res = await linkService.getAllLinks(session);

    return res;
}

export async function addLinkAction(_prevState: unknown, formData: FormData) {
    const session = await getSession();
    const data = {
        link: formData.get("link") as string
    }

    const res = await linkService.createNewLink(session, data);

    return res;

}

export async function deleteLinkAction(_prevState: unknown, formData: FormData) {
    const session = await getSession();
    const linkId = formData.get("linkId") as string;
    const res = await linkService.deleteLink(session, linkId);

    return res;
}

export async function editLinkAction(_prevState: unknown, formData: FormData) {
    const session = await getSession();
    const data = {
        title: formData.get("title") as string,
        link: formData.get("link") as string,
        summary: formData.get("summary") as string,
        categoryId: formData.get("categoryId") as string,
        id: formData.get("linkId") as string
    }
    const res = await linkService.editLink(session, data);

    return res;
}