import Block from '../../core/Block';
import Router from '../../core/Router';
import Store from '../../core/Store';

import AuthAPI from '../../utils/API/AuthAPI';

import Button from '../../components/button/button';
import InputForm from '../../components/input/input_form';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const singinTmpl = require('./singin.tmpl.pug');

type responseType = {
  currentTarget: Record<string, any>;
};

export default class Singin extends Block {
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

  protected getAttributes(): Record<string, string> {
    return {
      class: 'form',
    };
  }

  public update(): void {}

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
          console.log({
            login: inputLogin.value,
            password: inputPassword.value,
          });
          let resValidate = true;
          for (const key of inputs) {
            if (!key.validate()) resValidate = false;
          }
          if (!resValidate) return;

          AuthAPI.signIn({
            login: inputLogin.value,
            password: inputPassword.value,
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
      value: 'Нет аккаунта?',
      events: {
        click: (e) => {
          e.preventDefault();
          Router.go('/sign-up');
        },
      },
    });
    return {
      inputLogin,
      inputPassword,
      buttonSingin,
      buttonLink,
    };
  }

  render(): DocumentFragment {
    return this.compile(singinTmpl, { msg: this.props.msg });
  }
}
