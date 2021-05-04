<template>
  <div class="project-app">
    <project-list :homePageLocation="location" :homePageCategory="category" />
  </div>
</template>
<script>
import ProjectList from "@/cmps/project-list";
export default {
  name: "projectApp",
  data() {
    return {
      projs: this.$store.getters.projs,
      category: null,
      location: null,
    };
  },
  methods: {
    async loadProjs() {
      await this.$store.dispatch({ type: "loadProjs" });
      this.projs = this.$store.getters.projs;
    },
    resetFilter() {
      this.$store.commit({
        type: "setFilter",
        filter: { category: "", location: "", from: "", to: "", pageDiff: 0 },
      });
    },
  },
  created() {
    if (this.$route.params.category) {
      this.category = this.$route.params.category;
    } else if (this.$route.params.location) {
      this.location = this.$route.params.location;
    } else {
      this.loadProjs();
    }
  },
  destroyed() {
    this.resetFilter();
    this.$store.commit({ type: "setProjs", projs: [] });
  },
  components: {
    ProjectList,
  },
};
</script>
