import Block from '../../core/Block';
import Router from '../../core/Router';

import Button from '../button/button';

import normalTime from '../../utils/normalTime';

const chatMsgTmpl = require('./chat_msg.tmpl.pug');

type ChatLinkTypes = {
  message: string;
  time: string;
  isMyMessage: boolean;
  events?: Record<string, (e: Event) => void>;
  id?: string;
};

type AttributesTypes = {
  class: string;
  id: string;
};

export default class ChatMessage extends Block {
  constructor(props: ChatLinkTypes) {
    super('div', props);
  }

  update(): void {}

  protected getChildren(): Record<string, Block> {
    const button = new Button('a', {
      class: 'button button-transparent',
      value: 'Назад к чатам',
      events: {
        click: (e) => {
          e.preventDefault();
          Router.go('/');
        },
      },
    });
    return { button };
  }

  protected getAttributes(): Record<string, string> {
    const atrList: AttributesTypes = {
      class: this.props.isMyMessage
        ? 'chats-right-chat-msg chats-right-chat-msg-my'
        : 'chats-right-chat-msg',
      id: this.props.id,
    };
    return atrList;
  }

  protected getEvents(): Record<string, (e: Event) => void> {
    return this.props.events ? this.props.events : {};
  }

  public render() {
    return this.compile(chatMsgTmpl, {
      message: this.props.message,
      time: `${normalTime(new Date(this.props.time).getHours())}:${normalTime(
        new Date(this.props.time).getMinutes()
      )}`,
    });
  }
}
