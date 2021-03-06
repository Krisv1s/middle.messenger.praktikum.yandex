import Block from '../../utils/Block';

import buttonTmpl from './button.tmpl';

type ButtonTypes = {
  class: string;
  value: string;
  type?: string;
  href?: string;
  events?: Record<string, (e: Event) => void>;
};

type AttributesTypes = {
  class: string;
  type?: string;
  href?: string;
};

export default class Button extends Block {
  constructor(tagName: string, props: ButtonTypes) {
    super(tagName, props);
  }

  protected getAttributes(): Record<string, string> {
    const atrList: AttributesTypes = { class: this.props.class };
    if (this.props.type) atrList.type = this.props.type;
    if (this.props.href) atrList.href = this.props.href;
    return atrList;
  }

  protected getEvents(): Record<string, (e: Event) => void> {
    return this.props.events ? this.props.events : {};
  }

  public render() {
    return this.compile(buttonTmpl, { value: this.props.value });
  }
}
