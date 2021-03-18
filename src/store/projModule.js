import { projService } from "../services/proj.service.js";

export const projStore = {
  state: {
    projs: [],
    proj: null,
    filterBy: { name: "", tags: "all", type: "all", pageDiff: 0 },
    sortBy: { sortType: "location" },
  },
  getters: {
    projs(state) {
      return state.projs;
    },
    projForDetails(state) {
      return state.proj;
    },
    filterBy(state) {
      return state.filterBy;
    },
  },
  mutations: {
    setEmptyProj(state, payload) {
      state.proj = payload.proj;
    },
    setProjs(state, payload) {
      state.projs = payload.projs;
    },
    updateProj(state, { proj }) {
      const idx = state.projs.findIndex((t) => t._id === proj._id);
      state.projs.splice(idx, 1, proj);
    },
    addProj(state, { proj }) {
      state.projs.push(proj);
    },
    removeProj(state, { projId }) {
      let idx = state.projs.findIndex((t) => {
        return t._id === projId;
      });
      state.projs.splice(idx, 1);
    },
    getproj(state, { projFromStorage }) {
      state.proj = projFromStorage;
    },
    setFilter(state, payload) {
      state.filterBy = payload.filter;
      projService.setFilter(state.filterBy);
    },
    setSort(state, payload) {
      state.sortBy.sortType = payload.sort.sortType;
      projService.setSort(state.sortBy);
    },
  },
  actions: {
    async loadProjs(context, payload) {
      const projs = await projService.query();
      context.commit({ type: "setProjs", projs });
    },
    async loadEmptyProj(context, payload) {
      const proj = await projService.getEmptyProj();
      context.commit({ type: "setEmptyProj", proj });
    },
    async getProj({ commit }, payload) {
      try {
        const projFromStorage = await projService.getById(payload._id);
        commit({ type: "getproj", projFromStorage });
      } catch (err) {
        console.log("Store: Cannot get proj", err);
      }
    },
    async saveProj(context, payload) {
      const type = payload.project._id ? "updateProj" : "addProj";
      const savedProj = await projService.save(payload.project);
      context.commit({ type, proj: savedProj });
      context.dispatch("getProj", savedProj);
    },
    async removeProj(context, payload) {
      const removedProj = await projService.remove(payload.projId);
      context.commit({ type: "removeProj", removedProj });
    },
    setFilter(context, payload) {
      context.commit({ type: "setFilter", filter: payload.filter });
      context.dispatch("loadProjs");
    },
    setSort(context, payload) {
      context.commit({ type: "setSort", sort: payload.sort });
      context.dispatch("loadProjs");
    },
    async updateProjReview(context, payload) {
      const projToUpdate = await projService.getById(payload.id);
      projToUpdate.reviews.push(payload.review);
      var obj = { proj: projToUpdate };
      context.dispatch("saveProj", obj);
    },
  },
};
