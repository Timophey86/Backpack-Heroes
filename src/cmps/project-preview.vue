<template>
  <section class="project-preview">
    <h1>{{ proj.name }}</h1>
    <h6>Country: {{ proj.loc.country }}</h6>
    <h6>
      Duration of program:
    </h6>
    <h6>
      {{ proj.startsAt | moment(" MMMM Do YYYY") }} to
      {{ proj.startsEnd | moment("MMMM Do YYYY") }}
    </h6>
    <el-image :src="img" fit="fit"></el-image>
    <h6>Volunteer Fields:</h6>
    <div class="preview-tags">
      <el-tag v-for="(tag, index) in proj.tags" :key="index" type="info">
        {{ tag }}
      </el-tag>
    </div>
    <p>{{ descToDisplay }}</p>
    <!-- <p>{{ proj.details.description }}</p> -->
    <div class="preview-footer">
      <el-rate
        v-model="proj.reviews[0].rate"
        disabled
        show-score
        text-color="#ff9900"
        score-template="{value} points"
      />
      <button @click="openDetailsPage(proj._id)" class="continue-reading">
        Discover More..
      </button>
    </div>
  </section>
</template>

<script>
const test = require(`../assets/images/Agriculture/3.jpg`);
export default {
  name: "projectPreview",
  props: ["proj"],
  computed: {
    formatDateFrom() {
      return new Date(this.proj.startsAt).toDateString();
    },
    formatDateTo() {
      return new Date(this.proj.startsEnd).toDateString();
    },
    img() {
      return require(`../assets/images/${this.proj.name}/${this.proj.imgUrls[2]}` +
        ".jpg");
    },
    descToDisplay() {
      if (this.proj.details.description.length > 100) {
        return this.proj.details.description.substring(0, 100) + "...";
      } else {
        return this.proj.details.description;
      }
    },
    // averageRate(){
    //  return this.proj.reviews.acc / this.proj.reviews.length
    // // }
  },
  methods: {
    openDetailsPage(id) {
      this.$router.push(`/project/${id}`);
    },
  },
};
</script>
