import Block from '../../utils/Block';

import singinTmpl from './singin.tmpl';
import Button from '../../components/button/button';
import InputForm from '../../components/input/input_form';

export default class Singin extends Block {
  constructor() {
    super('form');
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'form',
    };
  }

  protected getChildren(): Record<string, Block> {
    const inputLogin = new InputForm({
      type: 'text',
      placeholder: 'Логин',
      name: 'login',
      id: 'input0',
    });
    const inputPassword = new InputForm({
      type: 'password',
      placeholder: 'Пароль',
      name: 'password',
      id: 'input1',
    });
    const inputs = [inputLogin, inputPassword];
    const buttonSingin = new Button('button', {
      class: 'button-primary',
      value: 'Авторизоваться',
      type: 'submit',
      events: {
        click: (e) => {
          e.preventDefault();
          for (const key of inputs) {
            key.validate();
          }
          console.log({
            login: inputLogin.value,
            password: inputPassword.value,
          });
        },
      },
    });
    const buttonLink = new Button('a', {
      class: 'button button-transparent',
      value: 'Нет аккаунта?',
      href: '/singup',
    });
    return {
      inputLogin,
      inputPassword,
      buttonSingin,
      buttonLink,
    };
  }

  render(): DocumentFragment {
    return this.compile(singinTmpl);
  }
}
