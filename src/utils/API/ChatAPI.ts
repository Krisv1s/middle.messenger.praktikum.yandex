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
      try {
        Store.setState('chats', JSON.parse(res.currentTarget.response));
      } catch (err) {
        console.log(err);
      }
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
      try {
        Socket.open(id, data, JSON.parse(res.currentTarget.response).token);
        Socket.message();
      } catch (err) {
        console.log(err);
      }
    });
  }

  public getUser(data: Record<string, any>) {
    const options: Options = {
      method: MethodTypes.POST,
      credentials: true,
      body: data,
    };
    return this.http.post(this.url + ListUrl.getUser, options);
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
      method: MethodTypes.DELETE,
      credentials: true,
      body: data,
    };
    return this.http.delete(this.url + ListUrl.deleteUser, options);
  }

  public getChatUserList(data: Record<string, any>) {
    const options: Options = {
      method: MethodTypes.GET,
      credentials: true,
    };
    return this.http
      .get(`${this.url + ListUrl.chats}/${data.id}${ListUrl.users}`, options)
      .then((res) => {
        try {
          const response = JSON.parse(res.currentTarget.response);
          let str = response?.[0]?.login || '';
          for (let i = 1; i < response.length; i += 1) {
            const element = response[i];
            str += `, ${element?.login}`;
          }
          Store.setState('currectUsers', str);
        } catch (err) {
          console.log(err);
        }
      });
  }
}

export default new ChatAPI();
