import { Container } from "inversify";
import { HttpClient } from "@/infrastructure/http/httpClient";
import { TYPES } from "@/infrastructure/constants/types";
import { AuthRepo } from "@/infrastructure/repositories/authRepo";
import { AuthService } from "./services/authService";
import { CategoryRepo } from "@/infrastructure/repositories/categoryRepo";
import { CategoryService } from "./services/categoryService";

const container = new Container();

container.bind(TYPES.httpClient).to(HttpClient);
container.bind(TYPES.authRepo).to(AuthRepo);
container.bind(TYPES.categoryRepo).to(CategoryRepo);
container.bind(AuthService).toSelf();
container.bind(CategoryService).toSelf();

export const authService = container.get<AuthService>(AuthService);
export const categoryService = container.get<CategoryService>(CategoryService);


