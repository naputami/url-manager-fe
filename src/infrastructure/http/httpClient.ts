/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from "@/lib/config";
import { injectable } from "inversify";
import "reflect-metadata";
import { HttpResponse } from "../interfaces/http";

@injectable()
export class HttpClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = config.apiUrl as string;
  }

  private async request(
    method: string,
    url: string,
    data?: Record<string, any>,
    cookie: string = ""
  ): Promise<HttpResponse> {
    console.log("cookie in request ", cookie)
    const response = await fetch(this.baseUrl + url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Cookie: `${cookie}`,
      },
      credentials: "include",
      body: data ? JSON.stringify(data) : undefined,
    });

    return response.json();
  }

  public async get(url: string, cookie: string = ""): Promise<HttpResponse> {
    return this.request("GET", url, undefined, cookie);
  }

  public async post(
    url: string,
    data?: Record<string, any>,
    cookie: string = ""
  ): Promise<HttpResponse> {
    return this.request("POST", url, data, cookie);
  }

  public async put(
    url: string,
    data: Record<string, any>,
    cookie: string = ""
  ): Promise<HttpResponse> {
    return this.request("PUT", url, data, cookie);
  }

  public async delete(url: string, cookie: string = ""): Promise<HttpResponse> {
    return this.request("DELETE", url, undefined, cookie);
  }
}
