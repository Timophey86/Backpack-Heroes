<template>
  <div class="main-container">
    <ul class="project-list">
      <li v-for="proj in projects" :key="proj._id">
        <project-preview :proj="proj" />
      </li>
    </ul>
  </div>
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
  },
};
</script>
