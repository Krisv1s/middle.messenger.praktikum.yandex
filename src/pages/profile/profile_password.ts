import Block from '../../core/Block';
import Router from '../../core/Router';
import Store from '../../core/Store';

import AuthAPI from '../../utils/API/AuthAPI';
import UserAPI from '../../utils/API/UserAPI';

import Button from '../../components/button/button';
import InputEdit from '../../components/input/input_edit';

const imgUser = require('@static/images/default_user.png');

const profilePasswordTmpl = require('./profile_password.tmpl.pug');

export default class ProfilePassword extends Block {
  userInfo = Store.getState()?.user;

  constructor() {
    super('div');
    if (!this.userInfo?.id) {
      AuthAPI.getUserInfo().then(() => {
        this.eventBus.emit(Block.EVENTS.FLOW_CDU, Store.getState());
        if (!Store.getState()?.user?.id) Router.go('/');
      });
    }
  }

  public update(): void {}

  protected getChildren(): Record<string, Block> {
    const inputCurrectPassword = new InputEdit({ name: 'password', value: '', type: 'password' });
    const inputNewPassword = new InputEdit({ name: 'password', value: '', type: 'password' });
    const inputNewPasswordAgain = new InputEdit({ name: 'password', value: '', type: 'password' });

    const inputs = [inputCurrectPassword, inputNewPassword, inputNewPasswordAgain];
    const buttonSave = new Button('button', {
      class: 'button-primary',
      value: 'Сохранить',
      type: 'submit',
      events: {
        click: (e) => {
          e.preventDefault();
          let resValidate = true;
          for (const key of inputs) {
            if (!key.validate()) resValidate = false;
          }
          if (!resValidate) return;
          UserAPI.changePassword({
            oldPassword: inputCurrectPassword.value,
            newPassword: inputNewPassword.value,
          });
        },
      },
    });

    const buttonGoBack = new Button('a', {
      class: 'button-back',
      value: `<svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="13" y="6.80005" width="11" height="1.6" transform="rotate(-180 13 6.80005)" fill="white"/>
                      <path d="M6 11L2 6L6 1" stroke="white" stroke-width="1.6"/>
                  </svg>`,
      events: {
        click: (e) => {
          e.preventDefault();
          Router.go('/profile');
        },
      },
    });
    return {
      inputCurrectPassword,
      inputNewPassword,
      inputNewPasswordAgain,
      buttonSave,
      buttonGoBack,
    };
  }

  render(): DocumentFragment {
    return this.compile(profilePasswordTmpl, {
      firstNameLine: Store.getState()?.user?.first_name || '',
      userAvatar: Store.getState()?.user?.avatar
        ? `https://ya-praktikum.tech/api/v2/resources${Store.getState().user.avatar}`
        : imgUser.default,
    });
  }
}
