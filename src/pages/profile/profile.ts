import Block from '../../utils/Block';

import profileTmpl from './profile.tmpl';
import Button from '../../components/button/button';
import ProfileUserLine from './profile_user_line';
import Router from '../../utils/Router';
import Store from '../../utils/Store';
import AuthAPI from '../../utils/API/AuthAPI';
import InputForm from '../../components/input/input_form';
import UserAPI from '../../utils/API/UserAPI';

export default class Profile extends Block {
  userInfo = Store.getState()?.user;

  constructor() {
    super('div');
    if (!this.userInfo?.id) {
      AuthAPI.getUserInfo().then(() => {
        this.eventBus.emit(Block.EVENTS.FLOW_CDU, Store.getState());
        // if (!Store.getState()?.user?.id) Router.go('/');
      });
    }
  }

  protected getChildren(): Record<string, Block> {
    const emailLine = new ProfileUserLine('div', {
      name: 'Почта',
      value: Store.getState()?.user?.email || '',
    });
    const loginLine = new ProfileUserLine('div', {
      name: 'Логин',
      value: Store.getState()?.user?.login || '',
    });
    const firstNameLine = new ProfileUserLine('div', {
      name: 'Имя',
      value: Store.getState()?.user?.first_name || '',
    });
    const firstNameLine2 = new ProfileUserLine('div', {
      name: 'Имя',
      value: Store.getState()?.user?.first_name || '',
    });
    const secondNameLine = new ProfileUserLine('div', {
      name: 'Фамилия',
      value: Store.getState()?.user?.second_name || '',
    });
    const displayNameLine = new ProfileUserLine('div', {
      name: 'Фамилия',
      value: Store.getState()?.user?.display_name || '',
    });
    const phoneLine = new ProfileUserLine('div', {
      name: 'Фамилия',
      value: Store.getState()?.user?.phone || '',
    });
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
    const buttonHide = new Button('a', {
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
    const buttonHideAvatar = new Button('a', {
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
    const buttonChangeAvatar = new Button('a', {
      class: 'button',
      value: `<img class="profile-avatar" src=${
        Store.getState().user.avatar
          ? `https://ya-praktikum.tech/api/v2/resources${Store.getState().user.avatar}`
          : 'https://fakeimg.pl/130x130/?text=png'
      }>`,
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
      emailLine,
      loginLine,
      firstNameLine,
      firstNameLine2,
      secondNameLine,
      displayNameLine,
      phoneLine,
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
    return this.compile(profileTmpl);
  }
}
