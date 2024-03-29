import Block from '../../core/Block';
import Router from '../../core/Router';
import Store from '../../core/Store';

import AuthAPI from '../../utils/API/AuthAPI';
import UserAPI from '../../utils/API/UserAPI';

import Button from '../../components/button/button';
import InputEdit from '../../components/input/input_edit';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const profileEditTmpl = require('./profile_edit.tmpl.pug');

export default class ProfileEdit extends Block {
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
    const inputEmail = new InputEdit({ name: 'email', value: Store.getState()?.user?.email || '' });
    const inputLogin = new InputEdit({ name: 'login', value: Store.getState()?.user?.login || '' });
    const inputFirstName = new InputEdit({
      name: 'first_name',
      value: Store.getState()?.user?.first_name || '',
    });
    const inputSecondName = new InputEdit({
      name: 'second_name',
      value: Store.getState()?.user?.second_name || '',
    });
    const inputChatName = new InputEdit({
      name: 'login',
      value: Store.getState()?.user?.display_name || '',
    });
    const inputPhone = new InputEdit({ name: 'phone', value: Store.getState()?.user?.phone || '' });
    const inputs = [inputEmail, inputLogin];
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
          UserAPI.changeUserProfile({
            email: inputEmail.value,
            login: inputLogin.value,
            first_name: inputFirstName.value,
            second_name: inputSecondName.value,
            phone: inputPhone.value,
            display_name: inputChatName.value,
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
      inputEmail,
      inputLogin,
      inputFirstName,
      inputSecondName,
      inputChatName,
      inputPhone,
      buttonSave,
      buttonGoBack,
    };
  }

  render(): DocumentFragment {
    return this.compile(profileEditTmpl, {
      firstNameLine: Store.getState()?.user?.first_name || '',
      userAvatar: Store.getState()?.user?.avatar
        ? `https://ya-praktikum.tech/api/v2/resources${Store.getState().user.avatar}`
        : 'https://fakeimg.pl/130x131/?text=png',
    });
  }
}
