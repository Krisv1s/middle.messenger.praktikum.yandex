import Block from '../../utils/Block';

import chatsTmpl from './chats.tmpl';

export default class Chats extends Block {
  constructor() {
    super('div');
  }

  render(): DocumentFragment {
    return this.compile(chatsTmpl);
  }
}
