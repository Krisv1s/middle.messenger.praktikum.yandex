import Block from '../../core/Block';
import Router from '../../core/Router';
import Store from '../../core/Store';

import AuthAPI from '../../utils/API/AuthAPI';
import ChatAPI from '../../utils/API/ChatAPI';
import renderDOM from '../../utils/renderDOM';

import Button from '../../components/button/button';
import ChatLink from '../../components/chat_link/chat_link';
import ChatMessage from '../../components/chat_msg/chat_msg';
import Input from '../../components/input/input';
import InputForm from '../../components/input/input_form';

const imgChat = require('@static/images/default_chat.png');
const imgUser = require('@static/images/default_user.png');

const chatsTmpl = require('./chats.tmpl.pug');

type responseType = {
  currentTarget: Record<string, any>;
};

export default class Chats extends Block {
  show: string;

  hide: string;

  constructor() {
    super('div');
    this.show = 'display:flex;position:fixed;';
    this.hide = 'display:none;position:fixed;';
    this.props.msg1 = '';
    this.props.msg2 = '';
    this.props.form1Styles = this.hide;
    this.props.form2Styles = this.hide;
    ChatAPI.getChats();
    AuthAPI.getUserInfo().then(() => {
      if (!Store.getState()?.user?.id) Router.go('/');
    });
  }

  private changeProps(prop: string, value: string) {
    this.props[prop] = value;
    this.update();
  }

  protected getChildren(): Record<string, Block> {
    const inputNameChat = new InputForm({
      type: 'text',
      placeholder: 'Имя чата',
      name: 'message',
      id: 'input5',
    });
    const buttonCreateChat = new Button('button', {
      class: 'button-primary',
      value: 'Создать чат',
      type: 'submit',
      events: {
        click: (e) => {
          e.preventDefault();

          ChatAPI.createChat({
            title: inputNameChat.value,
          }).then(() => {
            ChatAPI.getChats();
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
            .getElementById('create_chat')
            ?.setAttribute('style', 'display:none;position:fixed;');
        },
      },
    });

    const buttonNewChat = new Button('button', {
      class: 'button button-newchat',
      value: `<svg style="color: white" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16"> <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" fill="white"></path> </svg>   
      `,
      events: {
        click: (e) => {
          e.preventDefault();
          document
            .getElementById('create_chat')
            ?.setAttribute('style', 'display:flex;position:fixed;');
        },
      },
    });

    const buttonProfile = new Button('a', {
      class: 'button button-profile-link',
      value: `Профиль
      <svg style="margin-left:8px" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 9L5 5L1 1" stroke="#999999"/>
      </svg>`,
      events: {
        click: (e) => {
          e.preventDefault();
          Router.go('/profile');
        },
      },
    });

    const buttonAddUserToChat = new Button('button', {
      class: 'button button-edit',
      value: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="10.25" stroke="#3369F3" stroke-width="1.5"/>
      <line x1="10.9999" y1="5.5" x2="10.9999" y2="16.5" stroke="#3369F3" stroke-width="1.5"/>
      <line x1="5.49988" y1="11" x2="16.4999" y2="11" stroke="#3369F3" stroke-width="1.5"/>
      </svg>&ensp;&ensp;Добавить пользователя`,
      events: {
        click: (e) => {
          e.preventDefault();
          this.changeProps('form1Styles', this.show);
        },
      },
    });

    const buttonDeleteUserFromChat = new Button('button', {
      class: 'button button-edit',
      value: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="10.25" stroke="#3369F3" stroke-width="1.5"/>
      <line x1="7.11077" y1="7.11103" x2="14.8889" y2="14.8892" stroke="#3369F3" stroke-width="1.5"/>
      <line x1="7.11078" y1="14.8891" x2="14.889" y2="7.11093" stroke="#3369F3" stroke-width="1.5"/>
      </svg>&ensp;&ensp;Удалить пользователя`,
      events: {
        click: (e) => {
          e.preventDefault();
          this.changeProps('form2Styles', this.show);
        },
      },
    });

    const inputSearch = new Input({
      type: 'text',
      placeholder: 'Поиск',
      name: 'message',
      id: 'input2',
      class: 'input-search',
      autocomplete: 'off',
      value: Store.getState()?.currectSearch || '',
      events: {
        change: (e: InputEvent) => {
          e.preventDefault();
          Store.setState('currectSearch', (e.target as HTMLInputElement).value);
        },
        keyup: (e: KeyboardEvent) => {
          e.preventDefault();
          if (e.key === 'Enter') {
            Store.setState('currectSearch', (e.target as HTMLInputElement).value);
          }
        },
      },
    });

    const inputMessage = new Input({
      type: 'text',
      placeholder: 'Сообщение',
      name: 'message',
      id: 'input0',
      class: 'input input-message',
      autocomplete: 'off',
      events: {
        keyup: (e: KeyboardEvent) => {
          e.preventDefault();
          if (e.key === 'Enter') {
            ChatAPI.sendMsg(inputMessage.value);
          }
        },
      },
    });

    const buttonSendMessage = new Button('button', {
      class: 'button button-send',
      value: `<svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="5.19995" width="11" height="1.6" fill="white"/>
      <path d="M7 1L11 6L7 11" stroke="white" stroke-width="1.6"/>
      </svg>      
      `,
      events: {
        click: (e) => {
          e.preventDefault();
          ChatAPI.sendMsg(inputMessage.value);
        },
      },
    });

    const inputUserId = new InputForm({
      type: 'text',
      placeholder: 'Логин',
      name: 'message',
      id: 'input6',
    });

    const buttonAddUserSubmit = new Button('button', {
      class: 'button-primary',
      value: 'Добавить',
      type: 'submit',
      events: {
        click: (e) => {
          e.preventDefault();
          ChatAPI.getUser({
            login: inputUserId.value,
          }).then((res: responseType) => {
            try {
              const response = JSON.parse(res.currentTarget.response);
              if (response?.[0]) {
                ChatAPI.addUser({
                  users: [response?.[0]?.id],
                  chatId: Store.getState()?.currectChat?.id || 0,
                });
                this.changeProps('msg1', '');
                this.changeProps('form1Styles', this.hide);
                ChatAPI.getChatUserList({ id: Store.getState()?.currectChat?.id || 0 });
              } else {
                this.changeProps('msg1', 'Not found');
              }
            } catch (err) {
              console.log(err);
            }
          });
        },
      },
    });
    const buttonHideAddUser = new Button('a', {
      class: 'button button-transparent',
      value: 'Закрыть',
      events: {
        click: (e) => {
          e.preventDefault();
          this.changeProps('form1Styles', this.hide);
        },
      },
    });

    const inputUserIdDelete = new InputForm({
      type: 'text',
      placeholder: 'Логин',
      name: 'message',
      id: 'input6',
    });

    const buttonDeleteUserSubmit = new Button('button', {
      class: 'button-primary',
      value: 'Удалить',
      type: 'submit',
      events: {
        click: (e) => {
          e.preventDefault();
          if (
            (Store.getState()?.currectUsers || '').split(', ').indexOf(inputUserIdDelete.value) ===
            -1
          ) {
            this.changeProps('msg2', 'Not found');
            return;
          }
          ChatAPI.getUser({
            login: inputUserIdDelete.value,
          }).then((res: responseType) => {
            try {
              const response = JSON.parse(res.currentTarget.response);
              if (response?.[0]) {
                ChatAPI.deleteUser({
                  users: [response?.[0]?.id],
                  chatId: Store.getState()?.currectChat?.id || 0,
                });
                this.changeProps('msg2', '');
                this.changeProps('form2Styles', this.hide);
                ChatAPI.getChatUserList({ id: Store.getState()?.currectChat?.id || 0 });
              } else {
                this.changeProps('msg2', 'Not found');
              }
            } catch (err) {
              console.log(err);
            }
          });
        },
      },
    });
    const buttonHideDeleteUser = new Button('a', {
      class: 'button button-transparent',
      value: 'Закрыть',
      events: {
        click: (e) => {
          e.preventDefault();
          this.changeProps('form2Styles', this.hide);
        },
      },
    });

    return {
      buttonProfile,
      buttonCreateChat,
      buttonHide,
      inputNameChat,
      buttonNewChat,
      buttonAddUserToChat,
      inputMessage,
      inputSearch,
      buttonSendMessage,
      buttonDeleteUserFromChat,
      inputUserId,
      buttonHideAddUser,
      buttonAddUserSubmit,
      inputUserIdDelete,
      buttonDeleteUserSubmit,
      buttonHideDeleteUser,
    };
  }

  public update() {
    const curStore = Store.getState();
    const chatLinkList: ChatLink[] = [];
    for (const key of curStore.chats || []) {
      if (
        !document.getElementById(`chat${key.id}`) &&
        key.title
          .toLocaleLowerCase()
          .indexOf((Store.getState()?.currectSearch || '').toLocaleLowerCase()) !== -1
      ) {
        chatLinkList.push(
          new ChatLink({
            title: key.title,
            last_message: key.last_message,
            time: key.last_message?.time,
            unread_count: key.unread_count,
            id: `chat${key.id}`,
            events: {
              click: (e) => {
                e.preventDefault();
                console.log(key);
                if (!key.avatar) key.avatar = imgChat.default;
                else key.avatar = `https://ya-praktikum.tech/api/v2/resources${key.avatar}`;
                Store.setState('currectChat', key);
                ChatAPI.getChatUserList({ id: key?.id });
                ChatAPI.getChatToken(key.id, Store.getState()?.user?.id);
              },
            },
          })
        );
      }
    }
    for (const key of chatLinkList) {
      renderDOM('.chats-left-list', key);
    }
    const messageList: ChatMessage[] = [];
    for (const key of curStore?.messages || []) {
      console.log(key);
      if (!document.getElementById(`msg${key.id}`)) {
        messageList.push(
          new ChatMessage({
            message: key.content,
            time: key.time,
            id: `msg${key.id}`,
            isMyMessage: key.user_id === curStore?.user?.id,
          })
        );
      }
    }
    for (const key of messageList) {
      renderDOM('.chats-right-chat', key);
    }
  }

  render(): DocumentFragment {
    return this.compile(chatsTmpl, {
      currectChat: Store.getState()?.currectChat,
      currectProfile: {
        avatar: Store.getState()?.user?.avatar
          ? `https://ya-praktikum.tech/api/v2/resources${Store.getState().user.avatar}`
          : imgUser.default,
        name: `${Store.getState()?.user?.first_name || ''} ${
          Store.getState()?.user?.second_name || ''
        }`,
      },
      msg1: this.props.msg1,
      msg2: this.props.msg2,
      form1Styles: this.props.form1Styles,
      form2Styles: this.props.form2Styles,
      listUsers: Store.getState()?.currectUsers,
    });
  }
}
