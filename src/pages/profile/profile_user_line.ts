import Block from '../../utils/Block';

import profileUserLineTmpl from './profile_user_line.tmpl';

type ProfileUserLineTypes = {
  name: string;
  value: string;
  class?: string;
};

export default class ProfileUserLine extends Block {
  constructor(tagName: string, props: ProfileUserLineTypes) {
    super(tagName, props);
  }

  protected getEvents(): Record<string, (e: Event) => void> {
    return this.props.events ? this.props.events : {};
  }

  public render() {
    return this.compile(profileUserLineTmpl, { value: this.props.value });
  }
}
