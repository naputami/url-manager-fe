import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../constants/types";
import { HttpClient } from "../http/httpClient";
import { HttpResponse } from "../interfaces/http";
import { Link } from "../interfaces/entities";

@injectable()
export class LinkRepo{
    constructor(@inject(TYPES.httpClient) private httpClient: HttpClient){}

    async getAllLinks(session: string): Promise<HttpResponse<Partial<Link>[]>>{
        return this.httpClient.get("/links", session);
    }

    async createLink(session: string, data: Pick<Link, "link">): Promise<HttpResponse<Partial<Link>>>{
        return this.httpClient.post("/links", data, session);
    }

    async deleteLink(session: string, id: string): Promise<HttpResponse<Partial<Link>>>{
        return this.httpClient.delete(`/links/${id}`, session);
    }

    async editLink(session: string, data: Partial<Link>): Promise<HttpResponse<Partial<Link>>>{
        return this.httpClient.patch(`/links/${data.id}`, data, session);
    } 


}