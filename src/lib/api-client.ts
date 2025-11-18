// src/lib/api-client.ts

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
};

class ApiClient {
  private async fetch<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<T> {
    const { method = "GET", body, headers = {} } = options;
    const response = await fetch(`/api${endpoint}`, {
      method,
      headers: {
        "content-type": "application/json", // typo fixed
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const text = await response.text();
    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(text || response.statusText);
    }

    if (!response.ok) {
      throw new Error(data.error || response.statusText);
    }
    return data as T;
  }
}

export const apiClient = new ApiClient();
