import { socketService } from "../services/socket.service";

export const socketStore = {
  state: {},
  getters: {},
  mutations: {
    setJob(state, { job }) {
      state.job = job;
    },
  },
  actions: {
    // TODO: show on
    sendMsg(context, { msg }) {
      socketService.emit("chat newMsg", msg);

    },
    getChatHistory(context, { chatId }) {
      socketService.emit("getHistory", chatId);
    },
  },
};
