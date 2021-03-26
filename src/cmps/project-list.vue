<template>
<div>
    <el-select @setFilter="setFilter"/>
  <section class="project-list main-container">
    <div class="project-card" v-for="proj in projsForDisplay" :key="proj._id">
      <project-preview :proj="proj" />
    </div>
  </section>
  </div>
</template>
<script>
import projectPreview from "@/cmps/project-preview.vue";
import elSelect from "./select.cmp.vue"
export default {
  name: "projectList",
  props: ["projects"],
  computed: {
    projsForDisplay () {
      return this.$store.getters.projs
    }
  },
  methods: {
    setFilter(val) {
      this.$store.dispatch({type: "setFilter", filter:val})
    }
  },
  components: {
    projectPreview,
    elSelect
  }
};
</script>
