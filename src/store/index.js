import Vue from "vue";
import Vuex from "vuex";
import { userStore } from "./userModule.js";
import { projStore } from "./projModule.js";
import { reviewsStore } from "./reviewsModule";
import { reservationModule } from "./reservationModule"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    userStore,
    projStore,
    reviewsStore,
    reservationModule
  },
});
