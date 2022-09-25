import { JSDOM } from 'jsdom';

import { expect } from 'chai';

import Block from './Block';

const { window } = new JSDOM('<div class="app"></div>', { url: 'http://localhost' });
const { document } = window;
(global as any).window = window;
(global as any).document = document;

class TestBlock extends Block {
  constructor(tagName: string, props: Record<string, any>) {
    super(tagName, props);
  }

  public update(): void {}

  public render() {
    return this.compile(() => `<button>${this.props.value}</button>`, {});
  }
}

describe('Block', () => {
  const button = new TestBlock('button', {
    value: 'test',
  });
  it('create component', () => {
    expect(Boolean(button.id)).to.be.equal(true);
  });
  it('check value in block', () => {
    button.render();
    const element = button.getContent();
    expect(element?.textContent).to.equal('test');
  });
});
