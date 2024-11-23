import { injectable, inject } from "inversify";
import "reflect-metadata";
import { HttpClient } from "../http/httpClient";
import { TYPES } from "../constants/types";
import { HttpResponse } from "../interfaces/http";
import { Category } from "../interfaces/entities";

@injectable()
export class CategoryRepo {
    constructor(@inject(TYPES.httpClient) private httpClient: HttpClient){

    }

    async getCategories(cookie: string ): Promise<HttpResponse<Partial<Category>[]>> {
        return this.httpClient.get("/categories", cookie );
    }
}