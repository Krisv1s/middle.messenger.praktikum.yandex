import Block from '../../core/Block';
import Router from '../../core/Router';
import Store from '../../core/Store';

import AuthAPI from '../../utils/API/AuthAPI';
import UserAPI from '../../utils/API/UserAPI';

import Button from '../../components/button/button';
import InputForm from '../../components/input/input_form';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const profileTmpl = require('./profile.tmpl.pug');

export default class Profile extends Block {
  userInfo = Store.getState()?.user;

  constructor() {
    super('div');
    if (!this.userInfo?.id) {
      AuthAPI.getUserInfo().then(() => {
        if (!Store.getState()?.user?.id) Router.go('/');
      });
    }
  }

  public update(): void {}

  protected getChildren(): Record<string, Block> {
    const buttonChangeInfo = new Button('a', {
      class: 'button button-profile',
      value: 'Изменить данные',
      events: {
        click: (e) => {
          e.preventDefault();
          Router.go('/settings');
        },
      },
    });
    const inputPasswordCurrect = new InputForm({
      type: 'password',
      placeholder: 'Текущий пароль',
      name: 'password',
      id: 'input4',
    });
    const inputPassword = new InputForm({
      type: 'password',
      placeholder: 'Новый пароль',
      name: 'password',
      id: 'input5',
    });
    const inputPasswordReplay = new InputForm({
      type: 'password',
      placeholder: 'Пароль (ещё раз)',
      name: 'password',
      id: 'input6',
    });
    const buttonChangePassword = new Button('a', {
      class: 'button button-profile',
      value: 'Изменить пароль',
      events: {
        click: (e) => {
          e.preventDefault();
          document
            .getElementById('password_edit')
            ?.setAttribute('style', 'display:flex;position:fixed;');
        },
      },
    });
    const buttonExit = new Button('a', {
      class: 'button button-profile button-red',
      value: 'Выйти',
      events: {
        click: (e) => {
          e.preventDefault();
          AuthAPI.logout();
          Router.go('/');
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
          Router.go('/messenger');
        },
      },
    });
    const buttonSubmit = new Button('button', {
      class: 'button-primary',
      value: 'Сменить пароль',
      type: 'submit',
      events: {
        click: (e) => {
          e.preventDefault();

          UserAPI.changePassword({
            oldPassword: inputPasswordCurrect.value,
            newPassword: inputPassword.value,
          });
        },
      },
    });
    const buttonHide = new Button('button', {
      class: 'button button-transparent',
      value: 'Закрыть',
      events: {
        click: (e) => {
          e.preventDefault();
          document
            .getElementById('password_edit')
            ?.setAttribute('style', 'display:none;position:fixed;');
        },
      },
    });
    const inputFile = new InputForm({
      type: 'file',
      placeholder: 'Аватарка',
      name: 'file',
      id: 'input2',
    });
    const buttonSubmitAvatar = new Button('button', {
      class: 'button-primary',
      value: 'Сменить аватарку',
      type: 'submit',
      events: {
        click: (e) => {
          e.preventDefault();
          const formData = new FormData();
          const k = <HTMLInputElement>document.getElementById('input2');
          if (k && k.files) {
            formData.append('avatar', k?.files?.[0]);
            UserAPI.changeAvatar(formData);
          }
        },
      },
    });
    const buttonHideAvatar = new Button('button', {
      class: 'button button-transparent',
      value: 'Закрыть',
      events: {
        click: (e) => {
          e.preventDefault();
          document
            .getElementById('avatar_edit')
            ?.setAttribute('style', 'display:none;position:fixed;');
        },
      },
    });
    const buttonChangeAvatar = new Button('button', {
      class: 'button',
      value: `<div class="profile-avatar"><img class="profile-avatar-img" src=${
        Store.getState()?.user?.avatar
          ? `https://ya-praktikum.tech/api/v2/resources${Store.getState().user.avatar}`
          : 'https://fakeimg.pl/130x130/?text=png'
      }><span class="profile-avatar-text">Поменять<br />аватар</span></div>`,
      events: {
        click: (e) => {
          e.preventDefault();
          document
            .getElementById('avatar_edit')
            ?.setAttribute('style', 'display:flex;position:fixed;');
        },
      },
    });
    return {
      buttonChangeInfo,
      buttonChangePassword,
      buttonExit,
      inputPasswordCurrect,
      inputPassword,
      inputPasswordReplay,
      buttonSubmit,
      buttonHide,
      inputFile,
      buttonSubmitAvatar,
      buttonHideAvatar,
      buttonChangeAvatar,
      buttonGoBack,
    };
  }

  render(): DocumentFragment {
    return this.compile(profileTmpl, {
      emailLine: Store.getState()?.user?.email || '',
      loginLine: Store.getState()?.user?.login || '',
      firstNameLine: Store.getState()?.user?.first_name || '',
      firstNameLine2: Store.getState()?.user?.first_name || '',
      secondNameLine: Store.getState()?.user?.second_name || '',
      displayNameLine: Store.getState()?.user?.display_name || '',
      phoneLine: Store.getState()?.user?.phone || '',
    });
  }
}
