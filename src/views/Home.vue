<template>
  <section class="home-page main-container">
    <div class="hero">
      
    </div>
    <div class="main-img-container">    
    <div class=" img-category-container">
      <ul>
        <li v-for="proj in projs" :key="proj._id">
          <p>{{proj.name}}</p>
          <img @click="projList" :src="require(`@/assets/images/${proj.name}/${proj.imgUrls[0]}.jpg`)" alt=""/>
        </li>
      </ul>
    </div>

    <div class=" img-category-container">
      <ul>
        <li v-for="proj in projs" :key="proj._id">
          <p>{{proj.loc.address}}</p>
          <img @click="projList" :src="require(`@/assets/images/locations/${proj.loc.countryCode}.jpg`)" alt=""/>
        </li>
      </ul>
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
