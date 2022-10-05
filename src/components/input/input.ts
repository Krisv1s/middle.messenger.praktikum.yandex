import Block from '../../core/Block';

const inputTmpl = require('./input.tmpl.pug');

type InputTypes = {
  class?: string;
  type?: string;
  id?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  events?: Record<string, (e: Event) => void>;
  autocomplete?: string;
};

type AttributesTypes = {
  class?: string;
  type?: string;
  id?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  autocomplete?: string;
};

export default class Input extends Block {
  constructor(props: InputTypes) {
    super('input', props);
  }

  public update(): void {}

  protected getAttributes(): Record<string, string> {
    const atrList: AttributesTypes = { class: this.props.class || 'input' };
    if (this.props.type) atrList.type = this.props.type;
    if (this.props.id) atrList.id = this.props.id;
    if (this.props.placeholder) atrList.placeholder = this.props.placeholder;
    if (this.props.name) atrList.name = this.props.name;
    if (this.props.value) atrList.value = this.props.value;
    if (this.props.autocomplete) atrList.autocomplete = this.props.autocomplete;
    return atrList;
  }

  protected getEvents() {
    return this.props.events ? this.props.events : {};
  }

  public get value(): string {
    return (this.element as HTMLInputElement)?.value || '';
  }

  public render() {
    return this.compile(inputTmpl);
  }
}
