// import { orderService } from "../services/order.service.js";

export const orderStore = {
  state: {
    orders: [],
    order: null,
  },
  getters: {
    order(state) {
      return state.order;
    },
  },
  mutations: {
    loadOrder(state, { order }) {
      state.order = order;
    },
    updateOrder(state, { order }) {
      state.orders = order;
    },
  },
  actions: {
    // asyn loadOrders(context, payload) {

    // },
    async saveOrder(context, payload) {
      const savedorder = await orderService.save(
        payload.order
      );
      context.commit({
        type: "updateorder",
        order: savedorder,
      });
    },
    async loadOrder(context, payload) {
      try {
        const order = await orderService.getById(payload.id);
        context.commit({ type: "loadorder", order });
      } catch (err) {
        console.log("orderStore: Error in loadorder", err);
        throw err;
      }
    },
  },
};
