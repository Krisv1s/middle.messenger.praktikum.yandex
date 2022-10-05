import Block from '../../core/Block';
import Router from '../../core/Router';

import Button from '../button/button';

import normalTime from '../../utils/normalTime';

const imgChat = require('@static/images/default_chat.png');

const chatLink = require('./chat_link.tmpl.pug');

type ChatLinkTypes = {
  avatar?: string;
  title: string;
  last_message?: string;
  time: string;
  unread_count: number;
  events?: Record<string, (e: Event) => void>;
  id?: string;
};

type AttributesTypes = {
  id: string;
};

export default class ChatLink extends Block {
  constructor(props: ChatLinkTypes) {
    super('li', props);
  }

  update(): void {}

  protected getAttributes(): Record<string, string> {
    const atrList: AttributesTypes = { id: this.props.id };
    return atrList;
  }

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

  protected getEvents(): Record<string, (e: Event) => void> {
    return this.props.events ? this.props.events : {};
  }

  public render() {
    return this.compile(chatLink, {
      title: this.props.title,
      content: this.props?.last_message?.content?.substr(0, 50) || '',
      unread_count: this.props.unread_count,
      time: this.props.time
        ? `${normalTime(new Date(this.props.time).getHours())}:${normalTime(
            new Date(this.props.time).getMinutes()
          )}`
        : '',
      avatar: imgChat.default,
    });
  }
}
