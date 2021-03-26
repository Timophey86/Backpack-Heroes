<template>
  <section class="home-page">
    <div class="hero">
      <img :src="require(`@/assets/images/hero/8.jpg`)" alt="" />

      <div class="hero-txt">
        <h1>Travel differently, connect globally</h1>
        <p>
          Connecting kind hearted travelers with amazing volunteering
          opportunities around the globe
        </p>
        <div @click="projList" class="call-to-action">
          <h3>Explore more</h3>
        </div>
      </div>
    </div>

    <div class="main-container">
      <div class="main-img-container">
        <div class="img-category-container">
          <h1>Volunteering Categories</h1>
          <ul>
            <li v-for="(category, index) in categories" :key="index">
              <p>{{ category }}</p>
              <img
                @click="projList"
                :src="require(`@/assets/images/categories/${category}.jpg`)"
                alt=""
              />
            </li>
          </ul>
          <hr />
        </div>

        <div class="img-locations-container">
          <h1>Volunteering Locations</h1>
          <ul>
            <li v-for="(location, index) in locations" :key="index">
              <p>{{ location }}</p>
              <img
                @click="projList"
                :src="require(`@/assets/images/locations/${location}.jpg`)"
                alt=""
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "homePage",
  data() {
    return {
      projs: [],
      categories: [
        "Agriculture",
        "Animals",
        "Building",
        "Children",
        "Education",
        "Environment",
      ],
      locations: [
        "Costa Rica",
        "India",
        "Madagascar",
        "Nepal",
        "Peru",
        "Thailand",
      ],
    };
  },
  methods: {
    async loadProjs() {
      await this.$store.dispatch({
        type: "loadProjs",
        filter: { name: "", type: "all", userId: "", pageDiff: 0 },
      });
    },
    projList() {
      this.$router.push("/project");
    },
  },
  async created() {
    await this.loadProjs();
    this.projs = this.$store.getters.projs;
  },
};
</script>
