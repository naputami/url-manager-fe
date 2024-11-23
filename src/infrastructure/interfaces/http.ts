/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpResponse<T= any> {
    data: T;
    success: boolean;
    message: string;
    code: number;
  }
  
  export interface HttpRequestConfig {
    headers?: Record<string, string>;
    timeout?: number;
    baseURL?: string;
  }