import Block from '../../utils/Block';

import failWindowTmpl from './fail_window.tmpl';
import Button from '../button/button';

type FailWindowTypes = {
  code: string;
  text: string;
};

export default class FailWindow extends Block {
  constructor(props: FailWindowTypes) {
    super('div', props);
  }

  protected getChildren(): Record<string, Block> {
    const button = new Button('a', {
      class: 'button button-transparent',
      value: 'Назад к чатам',
      href: '/',
    });
    return { button };
  }

  public render() {
    return this.compile(failWindowTmpl, {
      code: this.props.code,
      text: this.props.text,
    });
  }
}
