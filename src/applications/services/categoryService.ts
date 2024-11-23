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
}