import { Container } from "inversify";
import { HttpClient } from "@/infrastructure/http/httpClient";
import { TYPES } from "@/infrastructure/constants/types";
import { AuthRepo } from "@/infrastructure/repositories/authRepo";
import { AuthService } from "./services/authService";

const container = new Container();

container.bind(TYPES.httpClient).to(HttpClient);
container.bind(TYPES.authRepo).to(AuthRepo);
container.bind(AuthService).toSelf();

export const authService = container.get<AuthService>(AuthService);


