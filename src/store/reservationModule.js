import {utilService} from "../services/util.service.js"
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
    async loadOrders(context, payload) {
      const orders = await orderService.query(payload._id);
      context.commit({ type: "setProjs", orders });
    },
    async sendOrder(context, payload) {
      const order = {
        _id: utilService.makeId(),
        createdAt: 9898989,
        member: {
          _id: payload.user._id,
          fullName: payload.user.fullname,
        },
        host: {
          _id: payload.user._id,
          fullName: payload.user.fullname,
        },
        proj: {
          _id: payload.project._id,
          name: payload.project.name,
        },
        status: "pending",
      };
      console.log('from send order ',order);
      context.dispatch({type:"updateUserOrder", order: order})
      // const orders = await orderService.query(payload._id);
    },
    async saveOrder(context, payload) {
      const savedorder = await orderService.save(payload.order);
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
    async updateUserOrder(context, payload) {
      var currHost = await userService.getById(payload.order.host._id);
      if (!currHost.orders) {
        currHost.orders = [];
        currHost.orders.push(payload.order);
      } else {
        currHost.orders = currHost.orders.filter((order) => {
          console.log('order id',order._id);
          console.log('payload id',payload.order._id );
        return order._id !== payload.order._id });
        currHost.orders.push(payload.order);
      }
      try {
      await userService.update(currHost);
      } catch (err) {
        console.log("userStore: Error in updateUser", err);
        throw err;
      }
    },
  },
};
