import Block from '../../utils/Block';

import profileTmpl from './profile.tmpl';
import Button from '../../components/button/button';

export default class Profile extends Block {
  constructor() {
    super('div');
  }

  protected getChildren(): Record<string, Block> {
    const buttonChangeInfo = new Button('a', {
      class: 'button button-profile',
      value: 'Изменить данные',
      href: '/edit',
    });
    const buttonChangePassword = new Button('a', {
      class: 'button button-profile',
      value: 'Изменить пароль',
      href: '/edit',
    });
    const buttonExit = new Button('a', {
      class: 'button button-profile button-red',
      value: 'Выйти',
      href: '/',
    });
    return {
      buttonChangeInfo,
      buttonChangePassword,
      buttonExit,
    };
  }

  render(): DocumentFragment {
    return this.compile(profileTmpl);
  }
}
