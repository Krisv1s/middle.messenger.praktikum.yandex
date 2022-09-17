import Block from '../../utils/Block';

import Button from '../button/button';
import Router from '../../utils/Router';
import chatLink from './chat_link.tmpl';

type ChatLinkTypes = {
  avatar?: string;
  title: string;
  last_message?: string;
  unread_count: number;
  events?: Record<string, (e: Event) => void>;
};

export default class ChatLink extends Block {
  constructor(props: ChatLinkTypes) {
    super('li', props);
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

  protected getEvents(): Record<string, (e: Event) => void> {
    return this.props.events ? this.props.events : {};
  }

  public render() {
    return this.compile(chatLink, {
      title: this.props.title,
    });
  }
}
