<template>
  <section class="project-preview" @click="showDetails(proj._id)">
    <h1>{{ proj.name }}</h1>
    <div class="preview-details">
      <p>{{ proj.loc.country }}</p>
      <p>
        {{ proj.startsAt | moment("MM/DD/YY") }} -
        {{ proj.endAt | moment("MM/DD/YY") }}
      </p>
    </div>
    <el-image :src="showImg" class="full" />
    <div class="preview-tag">
      <el-tag v-for="(tag, index) in proj.tags" :key="index" type="info">
        {{ tag }}
      </el-tag>
    </div>
    <div class="preview-rate">
      <el-rate
        v-if="proj.reviews.length"
        v-model="averageRate"
        disabled
        show-score
        text-color="#ff9900"
        score-template="{value} "
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
  data() {
    return {
      img: null,
    };
  },
  computed: {
    showImg() {
      if (this.proj.imgUrls.length) {
        return require(`@/assets/images/${this.proj.tags[0]}/${this.proj.imgUrls[2]}.jpg`);
      }
      return require("@/assets/images/categories/Agriculture.jpg");
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
    showDetails(id) {
      this.$router.push(`/project/${id}`);
    },
  },
};
</script>
