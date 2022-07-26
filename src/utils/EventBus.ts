export default class EventBus {
  private listeners: Record<string, ((args: unknown[]) => void)[]>;

  constructor() {
    this.listeners = {};
  }

  public on(event: string, callback: () => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  public off(event: string, callback: () => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
  }

  public emit(event: string, ...args: unknown[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    this.listeners[event].forEach((listener) => listener(args));
  }
}
