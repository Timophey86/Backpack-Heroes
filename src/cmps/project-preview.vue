<template>
  <section class="project-preview" @click="openDetailsPage(proj._id)">
    <h1>{{ proj.name }}</h1>
    <p>{{ proj.loc.country }}</p>
    <p>
      {{ proj.startsAt | moment("MM/DD/YY") }} -
      {{ proj.endAt | moment("MM/DD/YY") }}
    </p>
    <el-image :src="img" fit="fit"></el-image>
    <div class="preview-tags">
      <el-tag v-for="(tag, index) in proj.tags" :key="index" type="info">
        {{ tag }}
      </el-tag>
    </div>
    <p>{{ descToDisplay }}</p>
    <div class="preview-footer">
      <el-rate
        v-if="proj.reviews.length"
        v-model="averageRate"
        disabled
        show-score
        text-color="#ff9900"
        score-template="{value}"
      />
      <span v-else>No Ranking Yet</span>
      <span>( {{ proj.reviews.length }} )</span>
    </div>
  </section>
</template>

<script>
export default {
  name: "projectPreview",
  props: ["proj"],
  computed: {
    formatDateFrom() {
      return new Date(this.proj.startsAt).toDateString;
    },
    formatDateTo() {
      return new Date(this.proj.endAt).toDateString;
    },
    img() {
      return require(`@/assets/images/${this.proj.tags[0]}/${this.proj.imgUrls[2]}.jpg`);
    },
    descToDisplay() {
      if (this.proj.details.description?.length > 100) {
        return this.proj.details.description.substring(0, 100) + "...";
      } else {
        return this.proj.details.description;
      }
    },
    averageRate() {
      if (!this.proj.reviews) return;
      const rates = this.proj.reviews.map((review) => {
        return review.rate;
      });
      return +(
        rates.reduce((acc, rate) => acc + rate, 0) / this.proj.reviews.length
      ).toFixed(1);
    },
  },
  methods: {
    openDetailsPage(id) {
      console.log(id);
      this.$router.push(`/project/${id}`);
    },
  },
  created() {},
};
</script>
