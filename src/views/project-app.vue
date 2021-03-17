<template>
  <div class="project-app-page">
    <h1>Project App Page</h1>
    <project-list/>
  </div>
</template>
<script>
import ProjectList from '../cmps/project-list.vue';

export default {
  name: "projectApp",
  components: {
    ProjectList,
  },
};
</script>
