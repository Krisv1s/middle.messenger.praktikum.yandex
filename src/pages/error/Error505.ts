import Block from '../../core/Block';

import FailWindow from '../../components/fail_window/fail_window';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const errorTmpl = require('./error.tmpl.pug');

export default class Error505 extends Block {
  constructor() {
    super('div');
  }

  public update(): void {}

  protected getAttributes(): Record<string, string> {
    return {
      class: 'block-error',
    };
  }

  protected getChildren(): Record<string, Block> {
    const failWindow = new FailWindow({
      code: '505',
      text: 'Мы уже фиксим',
    });
    return { failWindow };
  }

  render(): DocumentFragment {
    return this.compile(errorTmpl);
  }
}
