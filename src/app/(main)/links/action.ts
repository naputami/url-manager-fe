"use server";
import { linkService } from "@/applications/instance";
import { getSession } from "@/utils/session";
import { handleAction } from "@/utils/action-handler";

export async function getAllLinkAction(title: string, category: string) {
  const session = await getSession();
  return await handleAction(() =>
    linkService.getAllLinks(session, title, category)
  );
}

export async function addLinkAction(_prevState: unknown, formData: FormData) {
  const session = await getSession();
  const data = {
    link: formData.get("link") as string,
  };

  return await handleAction(() => linkService.createNewLink(session, data));
}

export async function deleteLinkAction(
  _prevState: unknown,
  formData: FormData
) {
  const session = await getSession();
  const linkId = formData.get("linkId") as string;
  return await handleAction(() => linkService.deleteLink(session, linkId));
}

export async function editLinkAction(_prevState: unknown, formData: FormData) {
  const session = await getSession();
  const data = {
    title: formData.get("title") as string,
    link: formData.get("link") as string,
    summary: formData.get("summary") as string,
    categoryId: formData.get("categoryId") as string,
    id: formData.get("linkId") as string,
  };

  return await handleAction(() => linkService.editLink(session, data));
}
