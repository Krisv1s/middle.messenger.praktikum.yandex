import Button from '../../components/button/button';
import ChatLink from '../../components/chat_link/chat_link';
import ChatMessage from '../../components/chat_msg/chat_msg';
import Input from '../../components/input/input';
import InputForm from '../../components/input/input_form';
import AuthAPI from '../../utils/API/AuthAPI';
import ChatAPI from '../../utils/API/ChatAPI';
import Block from '../../utils/Block';
import renderDOM from '../../utils/renderDOM';
import Router from '../../utils/Router';
import Store from '../../utils/Store';

import chatsTmpl from './chats.tmpl';

export default class Chats extends Block {
  constructor() {
    super('div');
    ChatAPI.getChats();
    AuthAPI.getUserInfo().then(() => {
      if (!Store.getState()?.user?.id) Router.go('/');
    });
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
      class: 'button chat-unread',
      value: '+',
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
          document
            .getElementById('add_new_user')
            ?.setAttribute('style', 'display:flex;position:fixed;');
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
          document
            .getElementById('delete_user')
            ?.setAttribute('style', 'display:flex;position:fixed;');
        },
      },
    });

    const inputMessage = new Input({
      type: 'text',
      placeholder: 'Сообщение',
      name: 'message',
      id: 'input0',
      class: 'input input-message',
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
      placeholder: 'ID пользователя',
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

          ChatAPI.addUser({
            users: [+inputUserId.value],
            chatId: Store.getState()?.currectChat?.id || 0,
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
          document
            .getElementById('add_new_user')
            ?.setAttribute('style', 'display:none;position:fixed;');
        },
      },
    });

    const inputUserIdDelete = new InputForm({
      type: 'text',
      placeholder: 'ID пользователя',
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

          ChatAPI.deleteUser({
            users: [+inputUserId.value],
            chatId: Store.getState()?.currectChat?.id || 0,
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
          document
            .getElementById('delete_user')
            ?.setAttribute('style', 'display:none;position:fixed;');
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
    const chatLinkList = [];
    for (const key of curStore.chats || []) {
      chatLinkList.push(
        new ChatLink({
          title: key.title,
          unread_count: 0,
          events: {
            click: (e) => {
              e.preventDefault();
              console.log(key);
              if (!key.avatar) key.avatar = 'https://fakeimg.pl/34x34/?text=png';
              else key.avatar = `https://ya-praktikum.tech/api/v2/resources${key.avatar}`;
              Store.setState('currectChat', key);
              ChatAPI.getChatToken(key.id, Store.getState()?.user?.id);
            },
          },
        })
      );
    }
    for (const key of chatLinkList) {
      renderDOM('.chats-left-list', key);
    }
    const messageList = [];
    for (const key of curStore?.messages || []) {
      console.log(key);
      messageList.push(
        new ChatMessage({
          message: key.content,
          time: key.time,
          isMyMessage: key.user_id === curStore?.user?.id,
        })
      );
    }
    for (const key of messageList) {
      renderDOM('.chats-right-chat', key);
    }
  }

  render(): DocumentFragment {
    return this.compile(chatsTmpl, { currectChat: Store.getState()?.currectChat });
  }
}
