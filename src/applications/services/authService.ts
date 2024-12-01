import { TYPES } from "@/infrastructure/constants/types";
import { User } from "@/infrastructure/interfaces/entities";
import { HttpClient } from "@/infrastructure/http/httpClient";
import { HttpResponse } from "@/infrastructure/interfaces/http";
import { inject, injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class AuthService {
  constructor(
    @inject(TYPES.httpClient) private httpClient: HttpClient
  ) {}

  async register(
    name: string,
    email: string,
    password: string
  ): Promise<HttpResponse> {
    const data = {
      name,
      email,
      password,
    };
    return this.httpClient.post("/register", data);
  }

  async login(
    email: string,
    password: string
  ): Promise<HttpResponse<Partial<User>>> {
    const data: Partial<User> = {
      email,
      password,
    };

    return this.httpClient.post("/login", data);
  }

  async logout(cookie: string): Promise<HttpResponse> {
    return this.httpClient.post("/logout", undefined, cookie);
  }
}
