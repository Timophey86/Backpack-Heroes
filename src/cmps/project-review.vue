<template>
  <div class="review-container">
    <button @click="showForm">Add Review</button>
    <h1>{{ proj.name }} Review</h1>
    <div class="review-list">
      <div class="review-card" v-for="review in proj.reviews" :key="review._id">
        <div class="rate-review">
          <p v-for="star in review.rate" :key="star">⭐</p>
        </div>
        <longText :txt="review.txt" :length="maxLength" />
        <p>By: {{ review.by.fullname }}</p>
      </div>
    </div>
    <hr />
    <!-- <form v-if="isShowForm" @submit.prevent="addReview()" class="review-form">
      <h2>Your Review:</h2>
      <label>Your full name:</label>
      <input type="text" v-model="reviewToEdit.by.fullname" required />
      <label>Rate:</label>
      <input type="number" v-model="reviewToEdit.rate" min="0" max="5" />
      <textarea
        placeholder="Your Opinion Matters..."
        v-model="reviewToEdit.txt"
        required
      ></textarea>
      <button>Save</button>
      <button @click.prevent="hideForm" class="close-review">x</button>
    </form> -->
    <el-form v-if="isShowForm" ref="form" @submit="addReview()" v:model="reviewToEdit" class="review-form">
      <h2>Your Review:</h2>
      <el-form-item label="Your name:">
        <el-input v-model="reviewToEdit.by.fullname"></el-input>
      </el-form-item>

      <el-form-item >
        <el-rate v-model="reviewToEdit.rate" :colors="colors"> </el-rate>
      </el-form-item>

      <el-form-item>
        <el-input
          type="textarea"
          :rows="5"
          placeholder="Your Opinion Matters..."
          v-model="reviewToEdit.txt"
        >
        </el-input>
      </el-form-item>
            <button>Save</button>
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
