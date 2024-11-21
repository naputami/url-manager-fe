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

    private async request(method: string, url: string, data?: Record<string, any>): Promise<HttpResponse> {
        const response = await fetch(this.baseUrl + url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: data ? JSON.stringify(data) : undefined,
        });
        
        return response.json();
    }

    public async get(url: string): Promise<HttpResponse> {
        return this.request('GET', url);
    }

    public async post(url: string, data: Record<string, any>): Promise<HttpResponse> {
        return this.request('POST', url, data);
    }

    public async put(url: string, data: Record<string, any>): Promise<HttpResponse> {
        return this.request('PUT', url, data);
    }

    public async delete(url: string): Promise<HttpResponse> {
        return this.request('DELETE', url);
    }
}


