<template>
  <div v-if="projectToEdit" class="project-edit-page">
    <h1>Project Edit Page</h1>
    <label>Project Name:</label>
    <input
      type="text"
      v-model="projectToEdit.name"
      placeholder="Project Name"
    />

    <h2>Project Location:</h2>
    <label>Project country:</label>
    <input
      type="text"
      v-model="projectToEdit.loc.country"
      placeholder="Project country"
    />
    <label>Project countryCode:</label>
    <input
      type="text"
      v-model="projectToEdit.loc.countryCode"
      placeholder="Project countryCode"
    />
    <label>Project address:</label>
    <input
      type="text"
      v-model="projectToEdit.loc.address"
      placeholder="Project address"
    />

    <div class="project-gallery">
      <h2>Project image gallery</h2>
    </div>

    <label>Project Description:</label>

    <textarea
      type="text"
      v-model="projectToEdit.details.description"
      placeholder="Project Description"
    />
    <div class="project-dates">
      <label>Project start at: {{ projectToEdit.startsAt }}</label>
      <!-- <input type="date" v-model="projectToEdit.startsAt" /> -->
      <label>| Project end at: {{ projectToEdit.startsEnd }}</label>
      <!-- <input type="date" v-model="projectToEdit.startsEnd" /> -->
    </div>

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
    async update() {
      const projectCopy = JSON.parse(JSON.stringify(this.projectToEdit));
      await this.$store.dispatch({ type: "saveProj", project: projectCopy });
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
