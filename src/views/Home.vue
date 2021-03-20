<template>
  <section class="home-page">

    <div class="hero"
      :style="{
        background: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),url(${require(`../assets/images/hero/1.jpg`)})`,backgroundSize: 'cover',position: 'relative',}"
    >
    <h1>Service to others is the rent you pay for your room here on earth</h1>
    </div>

    <div class="main-container">
      <div class="main-img-container">
        <div class=" img-category-container">
          <h1>Volunteering Categories:</h1>
          <ul>
            <li v-for="proj in projs" :key="proj._id">
              <p>{{ proj.name }}</p>
              <img
                @click="projList"
                :src="
                  require(`@/assets/images/${proj.name}/${proj.imgUrls[0]}.jpg`)
                "
                alt=""
              />
            </li>
          </ul>
          <hr>
        </div>

        <div class=" img-locations-container">
          <h1>Volunteering Locations:</h1>
          <ul>
            <li v-for="proj in projs" :key="proj._id">
              <p>{{ proj.loc.address }}</p>
              <img
                @click="projList"
                :src="
                  require(`@/assets/images/locations/${proj.loc.countryCode}.jpg`)
                "
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
    };
  },
  methods: {
    async loadProjs() {
      await this.$store.dispatch({ type: "loadProjs" });
      this.projs = this.$store.getters.projs;
    },
    projList() {
      this.$router.push("/project");
    },
  },
  created() {
    this.loadProjs();
  },
};
</script>
