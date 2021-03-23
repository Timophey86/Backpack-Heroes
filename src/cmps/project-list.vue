<template>
  <section class="project-list">
    <div class="project-card" v-for="proj in projects" :key="proj._id">
      <project-preview :proj="proj" />
    </div>
  </section>
</template>
<script>
import projectPreview from "@/cmps/project-preview.vue";
export default {
  name: "projectList",
  props: ["projects"],
  data() {
    return {
      projs: [],
    };
  },
  components: {
    projectPreview,
  }
};
</script>
