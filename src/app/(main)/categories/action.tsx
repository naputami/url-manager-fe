"use server";
import { categoryService } from "@/applications/instance";
import { getSession } from "@/utils/session";

export async function getCategories(name: string) {
  const session = await getSession();
  const res = await categoryService.getCategories(name, session);

  return res;
}

export async function addNewCategoryAction(_prevState: unknown, formData: FormData) {
  const session = await getSession();
  const name = formData.get("name") as string;

  const res = await categoryService.createCategory(session, name);

  return res;

}

export async function deleteCategoryAction(_prevState: unknown, formData: FormData) {
  const session = await getSession();
  const categoryId = formData.get("categoryId") as string;

  const res = await categoryService.deleteCategory(session, categoryId);

  return res;
}


export async function editCategoryAction(_prevState: unknown, formData: FormData) {
  const session = await getSession();
  const categoryId = formData.get("categoryId") as string;
  const name = formData.get("name") as string;

  console.log("category id from form ", categoryId)

  const res = await categoryService.editCategory(session, categoryId, name);

  return res;

}