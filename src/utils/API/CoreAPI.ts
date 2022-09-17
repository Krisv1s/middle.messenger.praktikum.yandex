import { HTTPTransport } from '../HTTPTransport';

export default abstract class CoreAPI {
  http: HTTPTransport;

  url: string;

  public constructor(newUrl = 'https://ya-praktikum.tech/api/v2') {
    this.http = new HTTPTransport();
    this.url = newUrl;
  }
}
