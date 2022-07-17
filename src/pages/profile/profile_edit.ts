import Block from '../../utils/Block';

import profileEditTmpl from './profile_edit.tmpl';
import Button from '../../components/button/button';
import InputEdit from '../../components/input/input_edit';

export default class ProfileEdit extends Block {
  constructor() {
    super('div');
  }

  protected getChildren(): Record<string, Block> {
    const inputEmail = new InputEdit({ name: 'email', value: 'aoaaoaoao@ya.ru' });
    const inputLogin = new InputEdit({ name: 'login', value: 'Dasda' });
    const inputFirstName = new InputEdit({ name: 'first_name', value: 'Иван' });
    const inputSecondName = new InputEdit({ name: 'second_name', value: 'Иванов' });
    const inputChatName = new InputEdit({ name: 'login', value: 'Веселый.' });
    const inputPhone = new InputEdit({ name: 'phone', value: '88005555555' });

    const inputs = [inputEmail, inputLogin];
    const buttonSave = new Button('button', {
      class: 'button-primary',
      value: 'Сохранить',
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
            chat_name: inputChatName.value,
          });
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
    };
  }

  render(): DocumentFragment {
    return this.compile(profileEditTmpl);
  }
}
