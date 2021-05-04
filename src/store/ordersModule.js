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
      try {
        const orders = await orderService.query(payload);
        context.commit({ type: "loadOrders", orders });
      } catch (err) {
        console.log("orderStore: Error in saving the order", err);
        throw err;
      }
    },
    async sendOrder(context, payload) {
      try {
        const order = {
          createdAt: Date.now(),
          member: {
            _id: payload.user._id,
            fullname: payload.user.fullname,
            imgUrl: payload.user.imgUrl,
          },
          host: {
            _id: payload.project.host._id,
            fullname: payload.project.host.fullname,
            imgUrl: payload.user.imgUrl,
          },
          proj: {
            _id: payload.project._id,
            name: payload.project.name,
          },
          status: "pending",
        };
      const sentOrder = await orderService.save(order);
      } catch (err) {
        console.log("orderStore: Error in sending the order", err);
        throw err;
      }
    },
    async saveOrder(context, payload) {
      try {
        const savedOrder = await orderService.save(payload.order);
        context.commit({
          type: "updateorder",
          order: savedOrder,
        });
      } catch (err) {
        console.log("orderStore: Error in saving the order", err);
        throw err;
      }
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
      try {
        var order = await orderService.save(payload.order);
        var project = await projService.getById(order.proj._id);
        project.members.push(order.member);
        const savedProj = await projService.save(project);
      } catch (err) {
        console.log("orderStore: Error in approving the order", err);
        throw err;
      }
    },
    async removeOrder(context, { order }) {
      try {
        await orderService.remove(order._id);
        context.commit({ type: "removeOrder", id: order._id });
        const proj = await projService.getById(order.proj._id);
        var idx = proj.members.findIndex((members) => {
          return members._id === order.member._id;
        });
        if (idx > -1) {
          proj.members.splice(idx, 1);
          await projService.save(proj);
        }
      } catch (err) {
        console.log("orderStore: Error in removing order", err);
        throw err;
      }
    },
  },
};
