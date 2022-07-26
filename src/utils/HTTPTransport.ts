function queryStringify(data: Record<string, unknown>) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

export enum MethodTypes {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

interface IOptions {
  headers?: Record<string, string>;
  method: MethodTypes;
  data?: Document | XMLHttpRequestBodyInit;
}

export class HTTPTransport {
  public get = (url: string, options: IOptions = { method: MethodTypes.GET }) => {
    this.request(url, { ...options, method: MethodTypes.GET });
  };

  public put = (url: string, options: IOptions = { method: MethodTypes.GET }) => {
    this.request(url, { ...options, method: MethodTypes.PUT });
  };

  public post = (url: string, options: IOptions = { method: MethodTypes.GET }) => {
    this.request(url, { ...options, method: MethodTypes.POST });
  };

  public delete = (url: string, options: IOptions = { method: MethodTypes.GET }) => {
    this.request(url, { ...options, method: MethodTypes.DELETE });
  };

  public request = (url: string, options: IOptions, queryData: Record<string, unknown> = {}) => {
    const { headers = {}, method, data } = options;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      let urlGet = url;
      if (method === MethodTypes.GET && queryData) {
        urlGet += `${queryStringify(queryData)}`;
      }

      xhr.open(method, urlGet);

      if (headers) {
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      xhr.onload = resolve;
      xhr.onabort = reject;
      xhr.onerror = reject;

      if (!data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
