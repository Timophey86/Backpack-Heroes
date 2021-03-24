<template>
  <section class="home-page">
    <div class="hero"> 
      <img :src="require(`@/assets/images/hero/hero2.jpg`)" alt="">
    </div>
    <div class="main-container">
      <div class="main-img-container">
        <div class=" img-category-container">
          <h1>Volunteering Categories:</h1>
          <ul>
            <li v-for="proj in projs" :key="proj._id">
              <p>{{ proj.tags[0] }}</p>
              <img
                @click="projList"
                :src="
                  require(`@/assets/images/${proj.tags[0]}/${proj.imgUrls[0]}.jpg`)
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
