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
      <p>
        ⭐ {{ averageRate }} <span>( {{ proj.reviews.length }} )</span>
      </p>
    </div>
    <p class="spots-left-num">
      <span>{{ spotsLeft }}</span
      >/ {{ proj.numOfVolunteersNeeded }} spots left
    </p>
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
      if (this.proj.imgUrls[0] === "1") {
        if (this.proj.imgUrls.length) {
          return require(`@/assets/images/${this.proj.tags[0]}/${this.proj.imgUrls[2]}.jpg`);
        }
        return require("@/assets/images/categories/Agriculture.jpg");
      } else {
        return this.proj.imgUrls[0];
      }
    },
    spotsLeft() {
      return this.proj.numOfVolunteersNeeded - this.proj.members.length;
    },
    averageRate() {
      if (!this.proj.reviews.length) {
        return "No Rating Yet";
      }
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
