<template>
  <section class="review-container">
    <el-input
      v-if="!isShowForm"
      @focus="showForm"
      placeholder="Add Review..."
    />
    <h1>⭐ {{ averageRate || "" }} ({{ proj.reviews.length }} Reviews)</h1>
    <div class="review-list">
      <div
        v-for="(review, idx) in proj.reviews"
        :key="review._id"
        class="review-card"
      >
        <el-avatar
          v-if="proj.reviews[idx].by.imgUrl"
          :size="40"
          :src="reviewAvatar(idx)"
        />
        <el-avatar v-else :size="40" icon="el-icon-user-solid" />
        <p class="review-fullname">{{ review.by.fullname }}</p>
        <el-rate
          v-model="review.rate"
          show-score
          disabled
          text-color="#ff9900"
        />
        <pre>‟ {{ review.txt }} ”</pre>
        <p class="review-date">{{ Date.now() | moment("MMMM - DD - YYYY") }}</p>
      </div>
    </div>
    <transition name="el-zoom-in-center">
      <el-form
        v-if="isShowForm"
        @submit.prevent.native="addReview"
        class="review-form"
      >
        <h2>Your Review:</h2>
        <el-form-item label="Your name:">
          <el-input v-model="reviewToEdit.by.fullname" />
        </el-form-item>
        <el-form-item label="Your Rate:">
          <el-rate v-model="reviewToEdit.rate" :colors="colors" />
        </el-form-item>
        <el-form-item>
          <el-input
            type="textarea"
            :rows="5"
            placeholder="Your Opinion Matters..."
            v-model="reviewToEdit.txt"
            maxlength="100"
            show-word-limit
            resize="none"
          />
        </el-form-item>
        <el-button type="success" size="medium" @click.prevent="addReview"
          >Add</el-button
        >
        <el-button
          class="close-review"
          size="mini"
          icon="el-icon-close"
          @click.prevent="hideForm"
        />
      </el-form>
    </transition>
  </section>
</template>
<script>
export default {
  name: "review",
  props: ["proj"],
  data() {
    return {
      currUser: this.$store.getters.loggedinUser,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      isShowForm: false,
      reviewToEdit: {
        txt: "",
        rate: 5,
        by: {
          fullname: "",
          imgUrl: this.$store.getters.loggedinUser,
        },
      },
    };
  },
  computed: {
    averageRate() {
      const rates = this.proj.reviews.map((review) => {
        return review.rate;
      });
      return +(
        rates.reduce((acc, rate) => acc + rate, 0) / this.proj.reviews.length
      ).toFixed(1);
    },
  },
  methods: {
    reviewAvatar(idx) {
      return require("@/assets/images/avatars/" +
        this.proj.reviews[idx].by.imgUrl);
    },
    clearForm() {
      this.reviewToEdit = {
        txt: "",
        rate: 5,
        by: {
          fullname: "",
        },
      };
    },
    hideForm() {
      this.isShowForm = false;
      this.clearForm();
    },
    showForm() {
      this.isShowForm = true;
    },
    async addReview() {
      if (!this.currUser) {
        this.$swal({
          icon: "warning",
          title: "Please Log In to leave a review",
        });
        return;
      }
      const reviewCopy = JSON.parse(JSON.stringify(this.reviewToEdit));
      this.proj.reviews.unshift(reviewCopy);
      this.hideForm();

      await this.$store.dispatch({
        type: "saveProj",
        project: this.proj,
      });
    },
  },
};
</script>
