<template>
  <div class="review-container">
    <button @click="showForm">Add Review</button>
    <h2>Reviews:</h2>
    <div class="review-list">
      <el-carousel :interval="4000" type="card" >
        <el-carousel-item v-for="review in proj.reviews" :key="review._id">
          <div class="review-card">
            <div class="rate-review">
              <p v-for="star in review.rate" :key="star">⭐</p>
            </div>
            <h6>{{ review.txt }}</h6>
            <p>By: {{ review.by.fullname }}</p>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <el-form
      v-if="isShowForm"
      @submit.prevent="addReview()"
      ref="form"
      class="review-form"
    >
      <h2>Your Review:</h2>
      <el-form-item label="Your name:">
        <el-input v-model="reviewToEdit.by.fullname"></el-input>
      </el-form-item>
      <el-form-item>
        <el-rate v-model="reviewToEdit.rate" :colors="colors"> </el-rate>
      </el-form-item>
      <el-form-item>
        <el-input
          type="textarea"
          :rows="5"
          placeholder="Your Opinion Matters..."
          v-model="reviewToEdit.txt"
          maxlength="100"
          show-word-limit
        >
        </el-input>
      </el-form-item>
      <button @click.prevent="addReview()">Save</button>
      <button @click.prevent="hideForm" class="close-review">x</button>
    </el-form>
  </div>
</template>
<script>
import longText from "./long-text";
export default {
  name: "home",
  props: ["proj"],
  data() {
    return {
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      maxLength: 50,
      isShowForm: false,
      reviewToEdit: {
        txt: "",
        rate: 5,
        by: {
          fullname: "",
        },
      },
    };
  },

  methods: {
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
      const reviewCopy = JSON.parse(JSON.stringify(this.reviewToEdit));
      this.proj.reviews.unshift(reviewCopy);
      await this.$store.dispatch({
        type: "saveProj",
        project: this.proj,
      });
      this.hideForm();
    },
  },
  components: {
    longText,
  },
};
</script>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>