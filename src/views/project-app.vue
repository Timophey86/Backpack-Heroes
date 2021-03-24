<template>
  <div class="project-app">
    <project-list :projects="projs" />
  </div>
</template>
<script>
import ProjectList from "@/cmps/project-list";

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
