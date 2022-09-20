import Block from './block';
import renderDOM from './renderDOM';

export default class Route {
  private pathname: string;

  private Block: any;

  private block: Block;

  private props: Record<string, any>;

  constructor(pathname: string, view: any, props: Record<string, any>) {
    this.pathname = pathname;
    this.Block = view;
    this.props = props;
  }

  public match(pathname: string): boolean {
    return pathname === this.pathname;
  }

  public leave(): void {
    if (this.block) {
      this.block.deleteElement();
    }
  }

  public render(): void {
    this.block = new this.Block('div', this.props);
    renderDOM('.app', this.block);
    if (this.block?.update) {
      this.block?.update();
    }
  }
}
