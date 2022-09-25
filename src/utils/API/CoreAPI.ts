import { HTTPTransport } from '../../core/HTTPTransport';

import ListUrl from './ListUrl';

export default abstract class CoreAPI {
  http: HTTPTransport;

  url: string;

  public constructor(newUrl = ListUrl.main) {
    this.http = new HTTPTransport();
    this.url = newUrl;
  }
}
