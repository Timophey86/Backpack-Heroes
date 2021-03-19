<template>
  <div>
    <div class="review-list">
      <div class="review-card" v-for="review in proj.reviews" :key="review._id">
        <p>Rate: {{ review.rate }}</p>
        <h3>{{ review.txt }}</h3>
        <p>By: {{ review.by.fullname }}</p>
      </div>
    </div>
    <button @click="toggleForm">Add Review</button>
    <hr />
    <form v-if="isShowForm" @submit.prevent="addReview()" class="review-form">
      <h2>Your gossip:</h2>
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
      <button @click="toggleForm" class="close-review">x</button>
    </form>
  </div>
</template>
<script>
export default {
  name: "home",
  props: ["proj"],
  data() {
    return {
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
    toggleForm() {
      this.isShowForm = !this.isShowForm;
    },
    async addReview() {
      const reviewCopy = JSON.parse(JSON.stringify(this.reviewToEdit));
      this.proj.reviews.push(reviewCopy);
      await this.$store.dispatch({
        type: "saveProj",
        project: this.proj,
      });
      this.reviewToEdit = {
        txt: "",
        rate: 5,
        by: {
          fullname: "",
        },
      };
    },
  },
};
</script>
