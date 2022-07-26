import Block from '../../utils/Block';

import errorTmpl from './error.tmpl';
import FailWindow from '../../components/fail_window/fail_window';

export default class Error505 extends Block {
  constructor() {
    super('div');
  }

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
