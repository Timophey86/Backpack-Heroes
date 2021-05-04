<template>
  <div v-if="projectToEdit" class="project-edit">
    <el-form @submit.native.prevent="submitProj">
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
      <el-form-item label="Number of volunteers needed:">
        <el-input-number
          v-model="projectToEdit.numOfVolunteersNeeded"
          :min="1"
          :max="100"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="Tags:">
        <el-select
          v-model="projectToEdit.tags"
          multiple
          filterable
          allow-create
          placeholder="Choose tags for your project"
        >
          <el-option
            v-for="tag in projectToEdit.tags"
            :key="tag"
            :value="tag.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Amenities:">
        <el-select
          v-model="projectToEdit.details.amenities"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="Choose tags for your project"
        >
          <el-option
            v-for="amenitie in projectToEdit.details.amenities"
            :key="amenitie"
            :value="amenitie.value"
          >
          </el-option>
        </el-select>
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
            v-model="projectToEdit.endAt"
            type="date"
            placeholder="Pick a day"
          />
        </div>
      </el-form-item>
      <el-form-item class="img-upload" label="Upload Images">
        <label for="imgUploader">
          <img
            v-if="!isLoading"
            src="http://simpleicon.com/wp-content/uploads/cloud-upload-2.png"
            alt=""
          />
          <img
            v-else
            class="loading"
            src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
            alt=""
          />
        </label>
        <div class="imgList">
          <img
            v-for="(imgUrl, index) in projectToEdit.imgUrls"
            :src="imgUrl"
            :key="index"
          />
        </div>
        <input type="file" id="imgUploader" @change="onUploadImg" />
      </el-form-item>
      <el-button
        @click.prevent="submitProj"
        type="primary"
        icon="el-icon-check"
      ></el-button>
    </el-form>
  </div>
</template>
<script>
import { uploadImg } from "../services/img-upload.service";

export default {
  name: "project-edit",
  data() {
    return {
      projectToEdit: null,
      isLoading: false,
    };
  },
  computed: {
    displayedProj() {
      return this.$store.getters.projForDetails;
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
    async submitProj() {
      if (this.projectToEdit.imgUrls.length < 3) {
        this.$swal({
          icon: "info",
          title: "Please choose at least 3 Imaged",
        });
        return;
      }
      if (typeof this.projectToEdit.startsAt === "string" || "object") {
        this.projectToEdit.startsAt = Date.parse(this.projectToEdit.startsAt);
      }
      if (typeof this.projectToEdit.endAt === "string" || "object") {
        this.projectToEdit.endAt = Date.parse(this.projectToEdit.endAt);
      }
      const projectCopy = JSON.parse(JSON.stringify(this.projectToEdit));
      await this.$store.dispatch({ type: "saveProj", project: projectCopy });
      this.$router.push("/project");
    },
    async onUploadImg(ev) {
      if (this.projectToEdit.imgUrls.length >= 3) {
        this.$swal({
          icon: "info",
          title: "Choose 3 Imaged only",
        });
        return;
      }
      this.isLoading = true;
      const res = await uploadImg(ev);
      this.projectToEdit.imgUrls.push(res.url);
      console.log(this.projectToEdit);
      this.isLoading = false;
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
