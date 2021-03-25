<template>
  <section class="project-list main-container">
    <el-select v-model="value" placeholder="Select">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>

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
      options: [
        {
          value: "Agriculture",
          label: "Agriculture",
        },
        {
          value: "Animals",
          label: "Animals",
        },
        {
          value: "Building",
          label: "Building",
        },
        {
          value: "Children",
          label: "Children",
        },
        {
          value: "Education",
          label: "Education",
        },
        {
          value: "Environment",
          label: "Environment",
        },
      ],
      value: "",
    };
  },
  components: {
    projectPreview,
  },
};
</script>