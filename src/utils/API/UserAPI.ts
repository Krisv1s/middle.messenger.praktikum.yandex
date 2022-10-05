import CoreAPI from './CoreAPI';
import ListUrl from './ListUrl';

import { Options, MethodTypes } from './OptionsType';

class UserAPI extends CoreAPI {
  constructor() {
    super();
  }

  public changeUserProfile(data: Record<string, any>) {
    const options: Options = {
      method: MethodTypes.PUT,
      credentials: true,
      mode: 'cors',
      body: data,
    };
    return this.http.put(this.url + ListUrl.changeProfileInfo, options);
  }

  public changePassword(data: Record<string, any>) {
    const options: Options = {
      method: MethodTypes.PUT,
      credentials: true,
      mode: 'cors',
      body: data,
    };
    return this.http.put(this.url + ListUrl.changePassword, options);
  }

  public changeAvatar(data: FormData) {
    const options: Options = {
      method: MethodTypes.PUT,
      credentials: true,
      data,
    };
    return this.http.put(this.url + ListUrl.changeAvatar, options);
  }
}

export default new UserAPI();
