<template>
  <div v-if="projectToEdit" class="project-edit-page">
    <h1>Project Edit Page</h1>

    <label>Project Name:</label>
    <input
      type="text"
      v-model="projectToEdit.name"
      placeholder="Project Name"
    />
    <label>Project Location:</label>
    <input
      type="text"
      v-model="projectToEdit.location"
      placeholder="Project Location"
    />

    <div class="project-gallery">
      <h2>Project image gallery</h2>
    </div>

    <label>Project Description:</label>

    <textarea
      type="text"
      v-model="projectToEdit.desc"
      placeholder="Project Description"
    />
    <div class="project-dates">
      <label>Project start at:</label>
      <input type="date" v-model="projectToEdit.startAt" />
      <label>Project end at:</label>
      <input type="date" v-model="projectToEdit.endAt" />
    </div>
    <label>Volunteers Quantity:</label>
    <input type="number" v-model="projectToEdit.members" min="1" />
    <button @click="update">Submit</button>
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
    async loadProject() {
      const id = this.$route.params.projId;
      if (id) {
        await this.$store.dispatch({ type: "getProj", _id: id });
      } else {
        await this.$store.dispatch({ type: "loadEmptyProj" });
      }
      this.projectToEdit = this.$store.getters.projForDetails;
    },
    update() {
      const projectCopy = JSON.parse(JSON.stringify(this.projectToEdit));
      this.$store.dispatch({ type: "saveProj", project: projectCopy });
      this.$router.push("/project");
    },
  },
  created() {
    this.loadProject();
  },
  watch: {
    "$route.params.projId"() {
      this.loadProject();
    },
  },
};
</script>
