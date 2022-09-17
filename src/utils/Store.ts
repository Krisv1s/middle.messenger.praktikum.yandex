import EventBus from './EventBus';
import set from './StoreMethods/set';

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  public state: Record<string, any> = {};

  public getState() {
    return this.state;
  }

  public clear() {
    this.state = {};
  }

  public setState(path: string, value: any) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
