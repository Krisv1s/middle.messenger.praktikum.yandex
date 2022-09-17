import CoreAPI from './CoreAPI';
import { Options, MethodTypes } from './OptionsType';

import ListUrl from './ListUrl';
import Store from '../Store';
import Socket from '../Socket';

class ChatAPI extends CoreAPI {
  constructor() {
    super();
  }

  public getChats() {
    const options: Options = {
      method: MethodTypes.GET,
      credentials: true,
      mode: 'cors',
    };
    return this.http.get(this.url + ListUrl.chats, options).then((res) => {
      Store.setState('chats', JSON.parse(res.currentTarget.response));
    });
  }

  public createChat(data: Record<string, any>) {
    const options: Options = {
      method: MethodTypes.POST,
      credentials: true,
      body: data,
    };
    return this.http.post(this.url + ListUrl.createChat, options);
  }

  public getChatToken(data: string, id: string) {
    const options: Options = {
      method: MethodTypes.POST,
      credentials: true,
      body: {},
    };
    return this.http.post(this.url + ListUrl.chatToken + data, options).then((res) => {
      Socket.open(id, data, JSON.parse(res.currentTarget.response).token);
      Socket.message();
    });
  }

  public addUser(data: Record<string, any>) {
    const options: Options = {
      method: MethodTypes.PUT,
      credentials: true,
      body: data,
    };
    return this.http.put(this.url + ListUrl.addUser, options);
  }

  public sendMsg(data: string) {
    Socket.send({ content: data, type: 'message' });
  }

  public deleteUser(data: Record<string, any>) {
    const options: Options = {
      method: MethodTypes.PUT,
      credentials: true,
      body: data,
    };
    return this.http.delete(this.url + ListUrl.deleteUser, options);
  }
}

export default new ChatAPI();
