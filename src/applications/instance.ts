import { Container } from "inversify";
import { HttpClient } from "@/infrastructure/http/httpClient";
import { TYPES } from "@/infrastructure/constants/types";
import { AuthService } from "./services/authService";
import { CategoryService } from "./services/categoryService";
import { LinkService } from "./services/linkService";

const container = new Container();

container.bind(TYPES.httpClient).to(HttpClient);
container.bind(AuthService).toSelf();
container.bind(CategoryService).toSelf();
container.bind(LinkService).toSelf();

export const authService = container.get<AuthService>(AuthService);
export const categoryService = container.get<CategoryService>(CategoryService);
export const linkService = container.get<LinkService>(LinkService);


