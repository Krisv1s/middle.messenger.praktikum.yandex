import Block from '../../utils/Block';

import inputFormTmpl from './input_form.tmpl';
import Input from './input';

import isValid from '../../utils/isValid';

type InputFormTypes = {
  type: string;
  id: string;
  placeholder: string;
  name: string;
  events?: Record<string, (e: Event) => void>;
};

export default class InputForm extends Block {
  constructor(props: InputFormTypes) {
    super('div', props);
  }

  public update(): void {}

  protected getAttributes(): Record<string, string> {
    return { class: 'input_block' };
  }

  protected getChildren(): Record<string, Block> {
    const input = new Input({
      type: this.props.type,
      id: this.props.id,
      placeholder: this.props.placeholder,
      name: this.props.name,
      events: {
        blur: this.validate.bind(this),
      },
    });
    return {
      input,
    };
  }

  public validate() {
    const { res, message } = isValid(this.props.name, this.value);
    if (!res) {
      this.setProps({ ...this.props, validMsg: message });
    } else {
      this.setProps({ ...this.props, validMsg: '' });
    }
    return res;
  }

  public get value(): string {
    return this.children.input.value;
  }

  public render() {
    return this.compile(inputFormTmpl, {
      type: this.props.type,
      id: this.props.id,
      placeholder: this.props.placeholder,
      name: this.props.name,
      validMsg: this.props.validMsg || '',
    });
  }
}
