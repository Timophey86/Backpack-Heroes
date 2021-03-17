<template>
  <div class="project-details-page">
    <h1>Project Details Page</h1>
    <!-- {{ projectToEdit }} -->

    <label>Project Name </label>
    <!-- <input
      type="text"
      v-model="projectToEdit.name"
      placeholder="Project Name"
    /> -->
    <label>Project Location</label>
    <input type="text" placeholder="Project Location" />

    <div class="project-gallery">
      <h2>Project image gallery</h2>
    </div>

    <label>Project Description</label>
    <!-- <input
      type="text"
      v-model="projectToEdit.details.description"
      placeholder="Project Description"
    /> -->
    <label>Project Dates</label>
    <input type="date" />
    <label>Volunteers Quantity</label>
    <input type="number" />
    <button>Create Project</button>
  </div>
</template>
<script>
export default {
  name: "project-edit",
  data() {
    return {
      projectToEdit: null,
    };
  },
  methods: {
    loadproject() {
      const id = this.$route.params.projId;

      // this.$store.dispatch({ type: "getProj" });
      // this.projectToEdit = this.$store.getters.projForDetails;
    },
    // update() {
    //   const projectCopy = JSON.parse(JSON.stringify(this.projectToEdit));
    //   this.$store.dispatch({ type: "updateproject", project: projectCopy });
    //   this.$router.push("/project");
    // },
  },
  created() {
    this.loadproject();
  },
  watch: {
    "$route.params.projId"() {
      this.loadproject();
    },
  },
};
</script>
