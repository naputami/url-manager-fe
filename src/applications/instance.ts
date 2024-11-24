import { Container } from "inversify";
import { HttpClient } from "@/infrastructure/http/httpClient";
import { TYPES } from "@/infrastructure/constants/types";
import { AuthRepo } from "@/infrastructure/repositories/authRepo";
import { AuthService } from "./services/authService";
import { CategoryRepo } from "@/infrastructure/repositories/categoryRepo";
import { CategoryService } from "./services/categoryService";
import { LinkRepo } from "@/infrastructure/repositories/linkRepo";
import { LinkService } from "./services/linkService";

const container = new Container();

container.bind(TYPES.httpClient).to(HttpClient);
container.bind(TYPES.authRepo).to(AuthRepo);
container.bind(TYPES.categoryRepo).to(CategoryRepo);
container.bind(TYPES.linkRepo).to(LinkRepo);
container.bind(AuthService).toSelf();
container.bind(CategoryService).toSelf();
container.bind(LinkService).toSelf();

export const authService = container.get<AuthService>(AuthService);
export const categoryService = container.get<CategoryService>(CategoryService);
export const linkService = container.get<LinkService>(LinkService);


