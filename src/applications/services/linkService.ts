import { TYPES } from "@/infrastructure/constants/types";
import { Link } from "@/infrastructure/interfaces/entities";
import { HttpClient } from "@/infrastructure/http/httpClient";
import { HttpResponse } from "@/infrastructure/interfaces/http";
import { inject } from "inversify";

export class LinkService {
  constructor(@inject(TYPES.httpClient) private httpClient: HttpClient) {}

  async getAllLinks(
    session: string,
    title: string,
    category: string
  ): Promise<HttpResponse<Partial<Link>[]>> {
    let url = "/links";
    if (title && category) {
      url += `?title=${title}&category=${category}`;
    } else if (title) {
      url += `?title=${title}`;
    } else if (category) {
      url += `?category=${category}`;
    }
    return this.httpClient.get(url, session);
  }

  async createNewLink(
    session: string,
    data: Pick<Link, "link">
  ): Promise<HttpResponse<Partial<Link>>> {
    return this.httpClient.post("/links", data, session);
  }

  async deleteLink(
    session: string,
    id: string
  ): Promise<HttpResponse<Partial<Link>>> {
    return this.httpClient.delete(`/links/${id}`, session);
  }

  async editLink(
    session: string,
    data: Partial<Link>
  ): Promise<HttpResponse<Partial<Link>>> {
    return this.httpClient.patch(`/links/${data.id}`, data, session);
  }
}
