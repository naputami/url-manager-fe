import { inject, injectable } from "inversify";
import { TYPES } from "@/infrastructure/constants/types";
import { HttpClient } from "@/infrastructure/http/httpClient";
import { HttpResponse } from "@/infrastructure/interfaces/http";
import { Category } from "@/infrastructure/interfaces/entities";
import "reflect-metadata";

@injectable()
export class CategoryService {
  constructor(@inject(TYPES.httpClient) private httpClient: HttpClient) {}

  async getCategories(
    cookie: string
  ): Promise<HttpResponse<Partial<Category>[]>> {
    return this.httpClient.get("/categories", cookie);
  }

  async createCategory(
    cookie: string,
    name: string
  ): Promise<HttpResponse<Partial<Category>>> {
    const data = {
      name,
    };
    return this.httpClient.post("/categories", data, cookie);
  }

  async deleteCategory(
    cookie: string,
    categoryId: string
  ): Promise<HttpResponse<Partial<Category>>> {
    return this.httpClient.delete(`/categories/${categoryId}`, cookie);
  }

  async editCategory(
    cookie: string,
    categoryId: string,
    name: string
  ): Promise<HttpResponse<Partial<Category>>> {
    const data = {
      name,
    };
    return this.httpClient.patch(`/categories/${categoryId}`, data, cookie);
  }
}
