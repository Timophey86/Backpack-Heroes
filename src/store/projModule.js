import { projService } from "../services/proj.service.js";

export const projStore = {
  state: {
    projs: [],
    proj: null,
    filterBy: { name: "", tags: "all", type: "all", userId: "", pageDiff: 0 },
    sortBy: { sortType: "location" },
    isLoading: false
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
    loaderStatus(state){
      return state.isLoading
    }
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
    setLoader(state, payload) {
      state.isLoading = payload.loader
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
      try {
        context.commit({ type: "setLoader", loader: true });
        const projs = await projService.query(payload);
        context.commit({ type: "setProjs", projs });
        context.commit({ type: "setLoader", loader: false });
      } catch (err) {
        console.log("orderStore: Error in loading projects", err);
        throw err;
      }
    },
    async loadEmptyProj(context, payload) {
      try {
        const proj = await projService.getEmptyProj();
        context.commit({ type: "setEmptyProj", proj });
      } catch (err) {
        console.log("orderStore: Error in loading empty proj", err);
        throw err;
      }
    },
    async getProj({ commit }, payload) {
      try {
        const projFromStorage = await projService.getById(payload._id);
        commit({ type: "getproj", projFromStorage });
      } catch (err) {}
    },
    async saveProj(context, payload) {
      try {
        const type = payload.project._id ? "updateProj" : "addProj";
        const savedProj = await projService.save(payload.project);
        context.commit({ type, proj: savedProj });
        context.dispatch("getProj", savedProj);
      } catch (err) {
        console.log("orderStore: Error in saving the order", err);
        throw err;
      }
    },
    async removeProj(context, payload) {
      try {
        const removedProj = await projService.remove(payload.projId);
        context.commit({ type: "removeProj", removedProj });
      } catch (err) {
        console.log("orderStore: Error in saving the order", err);
        throw err;
      }
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
      try {
        const projToUpdate = await projService.getById(payload.id);
        projToUpdate.reviews.push(payload.review);
        var obj = { proj: projToUpdate };
        context.dispatch("saveProj", obj);
      } catch (err) {
        console.log("orderStore: Error in saving the order", err);
        throw err;
      }
    },
  },
};
