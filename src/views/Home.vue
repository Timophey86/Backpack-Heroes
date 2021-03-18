<template>
  <section class="home-page">
    <h1>Home Page</h1>
    <div class="hero">
      <h3>Hero Photo Home Page</h3>
    </div>
        
    <div class=" img-category-container">
      <ul>
        <li v-for="proj in projs" :key="proj._id">
          <h1>{{proj.name}}</h1>
          <img @click="projList" :src="require(`@/assets/images/${proj.name}/${proj.imgUrls[0]}.jpg`)" alt=""/>
        </li>
      </ul>
    </div>

    <div class=" img-category-container">
      <ul>
        <li v-for="proj in projs" :key="proj._id">
          <h1>{{proj.loc.address}}</h1>
          <img @click="projList" :src="require(`@/assets/images/locations/${proj.loc.countryCode}.jpg`)" alt=""/>
        </li>
      </ul>
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
    async loadProjs() {
      await this.$store.dispatch({type: "loadProjs"})
      this.projs = this.$store.getters.projs
    },
    projList(){
      this.$router.push('/project')
    }
  },
  created () {
    this.loadProjs()
  }, 
};
</script>
