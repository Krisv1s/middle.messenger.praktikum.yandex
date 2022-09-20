import * as pug from 'pug';
import { nanoid } from 'nanoid';

import EventBus from './EventBus';

type PropsTypes = { [key: string | symbol]: any };
type EventTypes = { [key: string]: (event?: Event) => void };
type ChildrenTypes = Record<string, Block>;

export default abstract class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: 'flow:render',
  };

  private _element: HTMLElement | null = null;

  private _meta: { tagName: string } = { tagName: 'div' };

  public props: PropsTypes;

  private _events: EventTypes = {};

  public children: ChildrenTypes = {};

  public eventBus: EventBus;

  public readonly id: string;

  constructor(tagName = 'div', props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
    };

    this.id = nanoid(6);

    this.props = this._makePropsProxy(props);

    this.eventBus = eventBus;

    this.children = this.getChildren();

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this, this.props));
    eventBus.on(Block.EVENTS.FLOW_CWU, this._componentDidUnMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  public deleteElement(): void {
    this.eventBus.emit(Block.EVENTS.FLOW_CWU);
  }

  private _createResources() {
    const { tagName } = this._meta;
    const elem = this._createDocumentElement(tagName);
    if (this.id) {
      elem.setAttribute('data-id', this.id);
    }
    this._element = elem;
    this._setAttributes();
  }

  public init() {
    this._createResources();
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidUnMount() {
    this.componentDidUnMount();
  }

  public componentDidUnMount() {
    const res = this.getContent();
    if (res !== null) {
      res.remove();
    }
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  public componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  protected getChildren(): ChildrenTypes {
    return {};
  }

  private _componentDidUpdate(oldProps: PropsTypes, newProps: PropsTypes) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.props = this._makePropsProxy({ ...this.props, newProps });
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  public componentDidUpdate(oldProps: PropsTypes, newProps: PropsTypes) {
    if (JSON.stringify(oldProps) !== JSON.stringify(newProps)) {
      return true;
    }
    return false;
  }

  public setProps = (nextProps: PropsTypes) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  protected getEvents(): EventTypes {
    return {};
  }

  private _addEvents() {
    const events = this.getEvents() || {};
    this._events = events;

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  private _removeEvents() {
    Object.keys(this._events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, this._events[eventName]);
    });
  }

  private _render() {
    const block = this.render();

    this._removeEvents();

    if (this._element) {
      this._element.innerHTML = '';
      this._element.removeAttribute('data-id');
      this._element.appendChild(block);
    }

    this._addEvents();
  }

  abstract render(): DocumentFragment;

  abstract update(): void;

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: PropsTypes) {
    return new Proxy(props, {
      set: (target, prop, value) => {
        if (target[prop as keyof PropsTypes] === value) {
          return true;
        }
        // eslint-disable-next-line no-param-reassign
        target[prop as keyof PropsTypes] = value;
        this.eventBus.emit(Block.EVENTS.FLOW_CDU);
        return true;
      },
      deleteProperty() {
        throw new Error('нет доступа');
      },
    });
  }

  private _setAttributes() {
    const attributesObj = this.getAttributes();

    Object.keys(attributesObj).forEach((key) => {
      this._element?.setAttribute(key, attributesObj[key]);
    });
  }

  protected getAttributes(): Record<string, string> {
    return {};
  }

  public compile(template: string, props?: Record<string, unknown>) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id='${child.id}' ></div>`;
    });

    const fragment = document.createElement('template');
    const compiledFunction = pug.compile(template);
    const compileHTML = compiledFunction(propsAndStubs);
    fragment.innerHTML = compileHTML;

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
      const childContent = child.getContent();
      if (childContent) {
        stub?.replaceWith(childContent);
      }
    });
    return fragment.content;
  }

  public get value(): string {
    return '';
  }

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }
}
