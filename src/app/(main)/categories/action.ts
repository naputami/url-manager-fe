"use server";
import { categoryService } from "@/applications/instance";
import { getSession } from "@/utils/session";
import { handleAction } from "@/utils/action-handler";

export async function getCategories(name: string) {
  const session = await getSession();
  return await handleAction(() => categoryService.getCategories(name, session));
}

export async function addNewCategoryAction(
  _prevState: unknown,
  formData: FormData
) {
  const session = await getSession();
  const name = formData.get("name") as string;

  return await handleAction(() =>
    categoryService.createCategory(session, name)
  );
}

export async function deleteCategoryAction(
  _prevState: unknown,
  formData: FormData
) {
  const session = await getSession();
  const categoryId = formData.get("categoryId") as string;

  return await handleAction(() =>
    categoryService.deleteCategory(session, categoryId)
  );
}

export async function editCategoryAction(
  _prevState: unknown,
  formData: FormData
) {
  const session = await getSession();
  const categoryId = formData.get("categoryId") as string;
  const name = formData.get("name") as string;

  return await handleAction(() =>
    categoryService.editCategory(session, categoryId, name)
  );
}