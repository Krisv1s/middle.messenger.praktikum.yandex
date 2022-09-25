import { expect } from 'chai';

import Router from './Router';
import Block from './Block';

class TestBlock1 extends Block {
  constructor() {
    super('div');
  }

  public update(): void {}

  public render() {
    return this.compile(() => '<button>1</button>', {});
  }
}

describe('Router', () => {
  const initRouter = () => {
    Router.use('/', TestBlock1).use('/404', TestBlock1).start();
  };

  it('Router should change location.pathname', () => {
    initRouter();
    expect(window.location.pathname).to.equal('/');
    Router.go('/1');
    expect(window.location.pathname).to.equal('/1');
  });
  it('Router should change history', () => {
    Router.go('/404');
    expect(window.history.length).to.eq(3);
  });
  it('Router should render page', () => {
    Router.go('/1');
    expect(window.location.pathname).to.equal('/1');
    expect(document.querySelector('button')?.textContent).to.equal('1');
  });
});
