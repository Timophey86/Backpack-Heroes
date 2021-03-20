<template>
  <div v-if="projectToEdit" class="project-edit-page">
    <el-form
      :model="projectToEdit"
      ref="ruleForm"
      label-width="auto"
      class="demo-ruleForm"
    >
      <el-form-item label="Project Name">
        <el-input
          v-model="projectToEdit.name"
          placeholder="Project Name..."
          clearable
        />
      </el-form-item>

      <el-form-item label="Project Country">
        <el-input
          v-model="projectToEdit.loc.country"
          placeholder="Country..."
          clearable
        />
      </el-form-item>

      <el-form-item label="Country Code">
        <el-input
          v-model="projectToEdit.loc.countryCode"
          placeholder="Country code..."
          clearable
        />
      </el-form-item>

      <el-form-item label="Project Address">
        <el-input
          v-model="projectToEdit.loc.address"
          placeholder="Address..."
          clearable
        />
      </el-form-item>

      <el-form-item label="Project Description">
        <el-input
          type="textarea"
          :rows="10"
          placeholder="Please input"
          v-model="projectToEdit.details.description"
          clearable
          resize="none"
        />
      </el-form-item>

      <el-form-item label="Project date">
        <div class="block">
          <el-date-picker
            v-model="projectToEdit.startsAt"
            type="date"
            placeholder="Pick a day"
          />
          <el-date-picker
            v-model="projectToEdit.startsEnd"
            type="date"
            placeholder="Pick a day"
          />
        </div>
      </el-form-item>
      <el-button
        @click="update"
        type="primary"
        icon="el-icon-check"
      ></el-button>
    </el-form>
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
  computed: {
    displayedProj() {
      return this.$store.getters.projForDetails;
    },
    formatDateFrom() {
      return new Date(this.displayedProj.startsAt).toDateString();
    },
    formatDateTo() {
      return new Date(this.displayedProj.startsEnd).toDateString();
    },
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
