import { chatStore } from './chatStore';

export const useStore = () => ({
  sendMessage: chatStore.sendMessage.bind(chatStore),
  messages: chatStore.messages,
});
