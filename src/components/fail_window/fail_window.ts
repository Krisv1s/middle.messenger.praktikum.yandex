import Block from '../../core/Block';
import Router from '../../core/Router';

import Button from '../button/button';

const failWindowTmpl = require('./fail_window.tmpl.pug');

type FailWindowTypes = {
  code: string;
  text: string;
};

export default class FailWindow extends Block {
  constructor(props: FailWindowTypes) {
    super('div', props);
  }

  public update(): void {}

  protected getChildren(): Record<string, Block> {
    const button = new Button('a', {
      class: 'button button-transparent',
      value: 'Назад к чатам',
      events: {
        click: (e) => {
          e.preventDefault();
          Router.go('/');
        },
      },
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
