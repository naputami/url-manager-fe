import { TYPES } from "@/infrastructure/constants/types";
import { User } from "@/infrastructure/interfaces/user";
import { AuthRepo } from "@/infrastructure/repositories/authRepo";
import { inject, injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class AuthService {
  constructor(@inject(TYPES.authRepo) private authRepo: AuthRepo) {}

  async register(name: string, email: string, password: string) {
    const data: User = {
        name,
        email,
        password
    }
    return this.authRepo.register(data);
  }

  async login(email: string, password: string){
    const data: Partial<User> = {
      email,
      password
    }

    return this.authRepo.login(data);
  }
}
