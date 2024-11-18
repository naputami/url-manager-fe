import { injectable, inject } from "inversify";
import "reflect-metadata";
import { HttpClient } from "../http/httpClient";
import { User } from "../interfaces/user";
import { TYPES } from "../constants/types";
import { HttpResponse } from "../interfaces/http";

@injectable()
export class AuthRepo {
    
    constructor(@inject(TYPES.httpClient) private httpClient: HttpClient){
    }


    public async register(data: User):Promise<HttpResponse>{
        return this.httpClient.post("/register", data);
    }

    public async login(data: Partial<User>): Promise<HttpResponse>{
        return this.httpClient.post("/login", data);
    }


}