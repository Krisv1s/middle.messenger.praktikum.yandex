import AuthAPI from './API/AuthAPI';
import Route from './Route';

import Store from './Store';

export enum StoreEvents {
  Updated = 'updated',
}

class Router {
  private currentRoute: Route | null;

  public routes: Route[];

  public history: History;

  constructor() {
    this.routes = [];
    this.history = window.history;
    this.currentRoute = null;
    AuthAPI.getUserInfo();
  }

  public use(pathname: string, block: any, props: Record<string, any> = {}): Router {
    const route = new Route(pathname, block, props);
    this.routes.push(route);
    return this;
  }

  public start(): void {
    window.addEventListener('popstate', (event: PopStateEvent) => {
      this.onRoute((event.currentTarget as Window).location.pathname);
    });

    this.onRoute(window.location.pathname);
  }

  public go(pathname: string): void {
    this.history.pushState({}, '', pathname);
    this.onRoute(pathname);
  }

  public back(): void {
    this.history.back();
  }

  public forward(): void {
    this.history.forward();
  }

  private onRoute(pathname: string): void {
    const route = this.getRoute(pathname);

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }
    let curStore = JSON.stringify(Store.getState());
    Store.on(StoreEvents.Updated, () => {
      if (curStore !== JSON.stringify(Store.getState())) {
        console.log(Store.getState());
        curStore = JSON.stringify(Store.getState());
        if (this.currentRoute) {
          this.currentRoute.leave();
          route.render();
        }
      }
    });
    this.currentRoute = route;
    route.render();
  }

  private getRoute(pathname: string): Route {
    return this.routes.find((route) => route.match(pathname)) || this.getRoute('/404');
  }
}

export default new Router();
