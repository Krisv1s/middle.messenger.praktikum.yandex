import { expect } from 'chai';

import { HTTPTransport, MethodTypes } from './HTTPTransport';

type responseType = {
  currentTarget: Record<string, any>;
};

describe('HTTPTransport', () => {
  const http = new HTTPTransport();

  it('check get', async () => {
    await http
      .get('https://jsonplaceholder.typicode.com/posts', {
        method: MethodTypes.GET,
      })
      .then((res: responseType) => {
        expect(!!res).to.equal(true);
      });
  });

  it('check post', async () => {
    await http
      .post('https://jsonplaceholder.typicode.com/posts', {
        method: MethodTypes.POST,
        body: {
          title: 'foo',
          body: 'bar',
          userId: 1,
        },
      })
      .then((res: responseType) => {
        expect(!!res).to.equal(true);
      });
  });

  it('check put', async () => {
    await http
      .put('https://jsonplaceholder.typicode.com/posts/1', {
        method: MethodTypes.PUT,
        body: {
          title: 'foo',
          body: 'bar',
          userId: 1,
          id: 1,
        },
      })
      .then((res: responseType) => {
        expect(!!res).to.equal(true);
      });
  });

  it('check delete', async () => {
    await http
      .delete('https://jsonplaceholder.typicode.com/posts/1', {
        method: MethodTypes.DELETE,
      })
      .then((res) => {
        expect(!!res).to.equal(true);
      });
  });
});
