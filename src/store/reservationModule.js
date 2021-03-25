import { utilService } from "../services/util.service.js";
import { projService } from "../services/proj.service.js";
import { orderService } from "../services/orders.service.js";

export const orderStore = {
  state: {
    orders: [],
    order: null,
  },
  getters: {
    order(state) {
      return state.order;
    },
    orders(state) {
      return state.orders;
    },
  },
  mutations: {
    loadOrders(state, { orders }) {
      state.orders = orders;
    },
    updateOrder(state, { order }) {
      state.orders = order;
    },
    removeOrder(state, { id }) {
      let idx = state.orders.host.findIndex((t) => {
        return t._id === id;
      });
      state.orders.host.splice(idx, 1);
    },
  },
  actions: {
    async loadOrders(context, payload) {
      const orders = await orderService.query(payload);
      context.commit({ type: "loadOrders", orders });
      
    },
    async sendOrder(context, payload) {
      const order = {
        createdAt: Date.now(),
        member: {
          _id: payload.user._id,
          fullname: payload.user.fullname,
        },
        host: {
          _id: payload.project.host._id,
          fullname: payload.project.host.fullname,
        },
        proj: {
          _id: payload.project._id,
          name: payload.project.name,
        },
        status: "pending",
      };
      orderService.save(order);
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
    async approveOrder(context, payload) {
      var order = await orderService.save(payload.order);
      var project = await projService.getById(order.proj._id);
      project.members.push(order.member);
      await projService.save(project);
    },
    async removeOrder(context, { order }) {
      console.log(order);
      await orderService.remove(order._id);
      context.commit({ type: "removeOrder", id: order._id });
      const proj = await projService.getById(order.proj._id);
      var idx = proj.members.findIndex(members => {return members._id === order.member._id});
      console.log('before ',proj);
      if(idx > -1) {
        proj.members.splice(idx, 1)
        await projService.save(proj)
      }
    },
  },
};
