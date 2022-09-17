import Block from '../../utils/Block';

import Button from '../button/button';
import Router from '../../utils/Router';
import chatLink from './chat_link.tmpl';

type ChatLinkTypes = {
  avatar?: string;
  title: string;
  last_message?: string;
  time: string;
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
    console.log(this.props);
    return this.compile(chatLink, {
      title: this.props.title,
      content: this.props?.last_message?.content || '',
      unread_count: this.props.unread_count,
      time: `${new Date(this.props.time).getHours()}:${new Date(this.props.time).getMinutes()}`,
    });
  }
}
