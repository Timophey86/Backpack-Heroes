<template>
  <ul class="project-list">
    <li>
      <project-preview />
    </li>
  </ul>
</template>
<script>
import projectPreview from "@/cmps/project-preview.vue";
export default {
  name: "projectList",
  components: {
    projectPreview,
  },
};
</script>
