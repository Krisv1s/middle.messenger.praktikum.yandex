import Block from '../../core/Block';
import Router from '../../core/Router';
import Store from '../../core/Store';

import AuthAPI from '../../utils/API/AuthAPI';

import Button from '../../components/button/button';
import InputForm from '../../components/input/input_form';

const singupTmpl = require('./singup.tmpl.pug');

type responseType = {
  currentTarget: Record<string, any>;
};

export default class Singup extends Block {
  userInfo = Store.getState()?.user;

  constructor() {
    super('form');

    if (!this.userInfo?.id) {
      AuthAPI.getUserInfo().then(() => {
        this.eventBus.emit(Block.EVENTS.FLOW_CDU, Store.getState());
        if (Store.getState()?.user?.id) Router.go('/messenger');
      });
    }
  }

  public update(): void {}

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
          console.log({
            email: inputEmail.value,
            login: inputLogin.value,
            first_name: inputFirstName.value,
            second_name: inputSecondName.value,
            phone: inputPhone.value,
            password: inputPassword.value,
            passwordReplay: inputPasswordReplay.value,
          });
          let resValidate = true;
          for (const key of inputs) {
            if (!key.validate()) resValidate = false;
          }
          if (!resValidate) return;
          AuthAPI.signUp({
            first_name: inputFirstName.value,
            second_name: inputSecondName.value,
            login: inputLogin.value,
            email: inputEmail.value,
            password: inputPassword.value,
            phone: inputPhone.value,
          }).then((res2: responseType) => {
            if (res2.currentTarget.status === 200) {
              AuthAPI.getUserInfo().then((res) => {
                console.log(res);
                Router.go('/messenger');
              });
            } else if (res2.currentTarget.status >= 500) {
              this.props.msg = 'Server Error';
            } else {
              try {
                this.props.msg = JSON.parse(res2.currentTarget.response).reason;
              } catch (err) {
                this.props.msg = 'Some error';
              }
            }
          });
        },
      },
    });
    const buttonLink = new Button('a', {
      class: 'button button-transparent',
      value: 'Войти',
      events: {
        click: (e) => {
          e.preventDefault();
          Router.go('/');
        },
      },
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
    return this.compile(singupTmpl, { msg: this.props.msg });
  }
}
