import Vue from "vue";
import Vuex from "vuex";
import { userStore } from "./userModule.js";
import { projStore } from "./projModule.js";
import { reviewStore } from "./reviewsModule";
import { orderStore } from "./ordersModule";
import { socketStore } from "./socketModule.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    userStore,
    projStore,
    reviewStore,
    orderStore,
    socketStore
  },
});
