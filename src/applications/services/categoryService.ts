import { inject, injectable } from "inversify";
import { TYPES } from "@/infrastructure/constants/types";
import { CategoryRepo } from "@/infrastructure/repositories/categoryRepo";
import "reflect-metadata";

@injectable()
export class CategoryService {

    constructor(@inject(TYPES.categoryRepo) private categoryRepo: CategoryRepo){

    }

    async getCategories(cookie: string){
        return this.categoryRepo.getCategories(cookie);
    }

    async createCategory(cookie: string, name: string){
        const data = {
            name
        }
        return this.categoryRepo.createCategory(cookie, data);
    }

    async deleteCategory(cookie: string, categoryId: string){
        return this.categoryRepo.deleteCategory(cookie, categoryId);
    }

    async editCategory(cookie: string, categoryId: string, name: string){
        const data = {
            name
        }
        return this.categoryRepo.editCategory(cookie, categoryId, data);
    }
}