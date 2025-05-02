import { makeAutoObservable } from 'mobx';

class ChatStore {
  messages = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  addMessage(message) {
    this.messages.push(message);
  }

  setLoading(value) {
    this.loading = value;
  }

  clearMessages() {
    this.messages = [];
  }
}

const chatStore = new ChatStore();
export default chatStore;
