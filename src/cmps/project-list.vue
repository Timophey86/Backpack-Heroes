<template>
  <div>
    <el-select
      :homePageCategory="homePageCategory"
      :homePageLocation="homePageLocation"
      @displayShowAllBtn="showShowAllBtb"
      @setListFilter="setFilter"
      ref="filterComponent"
    />
    <div v-if="!isShowAll && !isLoading" class="show-all">
      <span @click="showAll">Display All Projects</span>
    </div>
    <div class="loader" v-if="isLoading">
      <img src="@/assets/earth .gif" alt="" />
      <h2>Loading...</h2>
    </div>
    <div class="no-projects-found" v-if="!projsForDisplay.length && !isLoading">
      <img src="@/assets/not-found.png" alt="" />
      <h2>Sorry no projects were found</h2>
    </div>
    <section v-if="!isLoading" class="project-list main-container">
      <div class="project-card" v-for="proj in projsForDisplay" :key="proj._id">
        <project-preview :proj="proj" />
      </div>
    </section>
  </div>
</template>
<script>
import projectPreview from "@/cmps/project-preview.vue";
import elSelect from "./filter.cmp.vue";
export default {
  name: "projectList",
  props: ["projects", "homePageCategory", "homePageLocation"],
  data() {
    return {
      isShowAll: true,
    };
  },
  computed: {
    projsForDisplay() {
      return this.$store.getters.projs;
    },
    isLoading() {
      return this.$store.getters.loaderStatus;
    },
  },
  methods: {
    setFilter(val) {
      this.$store.dispatch({ type: "setFilter", filter: val });
    },
    resetFilter() {
      this.$store.commit({
        type: "setFilter",
        filter: { category: "", location: "", from: "", to: "", pageDiff: 0 },
      });
    },
    showShowAllBtb() {
      this.isShowAll = false;
    },
    async showAll() {
      this.resetFilter();
      this.$refs.filterComponent.resetFilterVals();
      await this.$store.dispatch({ type: "loadProjs" });
      this.isShowAll = true;
    },
  },
  created() {
    this.resetFilter();
  },
  components: {
    projectPreview,
    elSelect,
  },
};
</script>
