import { injectable, inject } from "inversify";
import "reflect-metadata";
import { HttpClient } from "../http/httpClient";
import { User } from "../interfaces/entities";
import { TYPES } from "../constants/types";
import { HttpResponse } from "../interfaces/http";

@injectable()
export class AuthRepo {
    
    constructor(@inject(TYPES.httpClient) private httpClient: HttpClient){
    }


    public async register(data: Partial<User>):Promise<HttpResponse>{
        return this.httpClient.post("/register", data);
    }

    public async login(data: Partial<User>): Promise<HttpResponse<Partial<User>>>{
        return this.httpClient.post("/login", data);
    }

    public async logout(cookie: string): Promise<HttpResponse> {
        return this.httpClient.post("/logout", undefined, cookie);
    }


}