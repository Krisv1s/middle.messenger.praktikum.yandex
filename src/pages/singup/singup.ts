import Block from '../../utils/Block';

import singupTmpl from './singup.tmpl';
import Button from '../../components/button/button';
import InputForm from '../../components/input/input_form';

export default class Singup extends Block {
  constructor() {
    super('form');
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'form',
    };
  }

  protected getChildren(): Record<string, Block> {
    const inputEmail = new InputForm({
      type: 'email',
      placeholder: 'Почта',
      name: 'email',
      id: 'input0',
    });
    const inputLogin = new InputForm({
      type: 'text',
      placeholder: 'Логин',
      name: 'login',
      id: 'input1',
    });
    const inputFirstName = new InputForm({
      type: 'text',
      placeholder: 'Имя',
      name: 'first_name',
      id: 'input2',
    });
    const inputSecondName = new InputForm({
      type: 'text',
      placeholder: 'Фамилия',
      name: 'second_name',
      id: 'input3',
    });
    const inputPhone = new InputForm({
      type: 'tel',
      placeholder: 'Телефон',
      name: 'phone',
      id: 'input4',
    });
    const inputPassword = new InputForm({
      type: 'password',
      placeholder: 'Пароль',
      name: 'password',
      id: 'input5',
    });
    const inputPasswordReplay = new InputForm({
      type: 'password',
      placeholder: 'Пароль (ещё раз)',
      name: 'password',
      id: 'input6',
    });
    const inputs = [
      inputEmail,
      inputLogin,
      inputFirstName,
      inputSecondName,
      inputPhone,
      inputPassword,
      inputPasswordReplay,
    ];
    const buttonSingup = new Button('button', {
      class: 'button-primary',
      value: 'Зарегистрироваться',
      type: 'submit',
      events: {
        click: (e) => {
          e.preventDefault();
          for (const key of inputs) {
            key.validate();
          }
          console.log({
            email: inputEmail.value,
            login: inputLogin.value,
            first_name: inputFirstName.value,
            second_name: inputSecondName.value,
            phone: inputPhone.value,
            password: inputPassword.value,
            passwordReplay: inputPasswordReplay.value,
          });
        },
      },
    });
    const buttonLink = new Button('a', {
      class: 'button button-transparent',
      value: 'Войти',
      href: '/singin',
    });
    return {
      inputEmail,
      inputLogin,
      inputFirstName,
      inputSecondName,
      inputPhone,
      inputPassword,
      inputPasswordReplay,
      buttonSingup,
      buttonLink,
    };
  }

  render(): DocumentFragment {
    return this.compile(singupTmpl);
  }
}
