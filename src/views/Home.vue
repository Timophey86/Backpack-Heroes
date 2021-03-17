<template>
  <section class="home-page">
    <h1>Home Page</h1>
    <div class="hero">
      <h3>Hero Photo Home Page</h3>
    </div>
    <div class="category">
      <h3>List of categories</h3>
    </div>
    <div class="location">
      <h3>List of locations</h3>
    </div>
    <div class="reviews">
      <h3>List of reviews</h3>
    </div>
    <div class="about-vision">
      <h3>About our vision</h3>
    </div>
  </section>
</template>
<script>
export default {
  name: "homePage",
  data() {
    return {
      projs: [],
    };
  },
  methods: {
    loadProjs() {
      this.projs = this.$store.getters.projs;
    },
  },
  created() {
    this.loadProjs();
  },
};
</script>
