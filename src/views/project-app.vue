<template>
  <div class="project-app-page">
    <h1>Project App Page</h1>
    <project-list :projects="projs" />
  </div>
</template>
<script>
import ProjectList from "../cmps/project-list.vue";

export default {
  name: "projectApp",
  data() {
    return {
      projs: [],
    };
  },
  methods: {
    async loadProjs() {
      await this.$store.dispatch({ type: "loadProjs" });
      this.projs = this.$store.getters.projs;
    },
  },
  created() {
    this.loadProjs();
  },
  components: {
    ProjectList,
  },
};
</script>
