import NodeFetch, { RequestInit } from 'node-fetch';

export type FetchResponse = Promise<{ [key: string]: string } | string>;
class Fetch {
  public static async request(
    url: string,
    options: RequestInit = {}
  ): FetchResponse {
    const { body, headers, method, ...rest } = options;

    const res = await NodeFetch(url, {
      method: method || 'post',
      body,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...rest,
    });

    console.info(`Fetch ${res.url} ${res.status} ${res.statusText}`);

    if (!res.ok) {
      console.error(JSON.stringify(res));
      throw new Error(res.statusText);
    }

    let result;
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      result = await res.json();
    } else {
      result = await res.text();
    }

    return result;
  }

  public static async get(url: string, options?: RequestInit): FetchResponse {
    return Fetch.request(url, {
      method: 'get',
      ...options,
    });
  }

  public static post(url: string, options?: RequestInit): FetchResponse {
    return Fetch.request(url, {
      method: 'post',
      ...options,
    });
  }
}

export default Fetch;
