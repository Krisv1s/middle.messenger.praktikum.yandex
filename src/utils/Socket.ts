import Store from './Store';

class Socket {
  private ping = 30000;

  private socket: WebSocket;

  private token: string;

  private chatId: string;

  private userId: string;

  private baseUrl = 'wss://ya-praktikum.tech/ws/chats';

  public constructor() {}

  public message() {
    this.socket.addEventListener('message', (res) => {
      try {
        const response = JSON.parse(res.data);
        if (Array.isArray(response)) {
          Store.setState('messages', response.reverse());
        } else if (response.content) {
          const curStore = Store.getState().messages;
          curStore.push(response);
          Store.setState('messages', curStore);
        }
      } catch (err) {
        console.log(err);
      }
      console.log(res);
    });
  }

  public send(obj: Record<string, any>) {
    this.socket.send(JSON.stringify(obj));
  }

  public getSocket() {
    return this.socket;
  }

  public open(userId: string, chatId: string, token: string) {
    this.userId = userId;
    this.chatId = chatId;
    this.token = token;
    this.socket = new WebSocket(`${this.baseUrl}/${this.userId}/${this.chatId}/${this.token}`);
    this.socket.addEventListener('open', () => {
      this.send({
        content: '0',
        type: 'get old',
      });
      this.pingPong();
    });
  }

  private pingPong() {
    setInterval(() => {
      this.send({ type: 'ping' });
    }, this.ping);
  }
}

export default new Socket();
