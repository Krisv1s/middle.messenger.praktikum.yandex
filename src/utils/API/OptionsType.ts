export enum MethodTypes {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

export type Options = {
  headers?: Record<string, string>;
  method: MethodTypes;
  data?: Document | XMLHttpRequestBodyInit;
  body?: Record<string, any>;
  credentials?: boolean;
  mode?: string;
};
