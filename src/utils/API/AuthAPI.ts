import CoreAPI from './CoreAPI';
import { Options, MethodTypes } from './OptionsType';

import ListUrl from './ListUrl';
import Store from '../Store';

class AuthAPI extends CoreAPI {
  constructor() {
    super();
  }

  public signUp(data: Record<string, any>) {
    const options: Options = {
      method: MethodTypes.POST,
      credentials: true,
      body: data,
    };
    return this.http.post(this.url + ListUrl.signUp, options);
  }

  public signIn(data: Record<string, any>) {
    const options: Options = {
      method: MethodTypes.POST,
      credentials: true,
      body: data,
    };
    return this.http.post(this.url + ListUrl.signIn, options);
  }

  public getUserInfo() {
    const options: Options = {
      method: MethodTypes.GET,
      credentials: true,
    };
    return this.http.get(this.url + ListUrl.user, options).then((res) => {
      Store.setState('user', JSON.parse(res.currentTarget.response));
      return res;
    });
  }

  public logout() {
    const options: Options = {
      method: MethodTypes.POST,
      credentials: true,
    };
    return this.http.post(this.url + ListUrl.logout, options).then(() => {
      Store.clear();
    });
  }
}

export default new AuthAPI();
