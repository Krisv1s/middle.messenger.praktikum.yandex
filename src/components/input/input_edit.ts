import Block from '../../core/Block';

import isValid from '../../utils/isValid';

import Input from './input';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const inputEditTmpl = require('./input_edit.tmpl.pug');

type InputFormTypes = {
  type?: string;
  name: string;
  value?: string;
  events?: Record<string, (e: Event) => void>;
};

export default class InputEdit extends Block {
  constructor(props: InputFormTypes) {
    super('div', props);
  }

  public update(): void {}

  protected getChildren(): Record<string, Block> {
    const input = new Input({
      name: this.props.name,
      value: this.props.value,
      class: 'input-edit',
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
    return this.compile(inputEditTmpl, {
      type: this.props.type,
      id: this.props.id,
      placeholder: this.props.placeholder,
      name: this.props.name,
      validMsg: this.props.validMsg || '',
    });
  }
}
