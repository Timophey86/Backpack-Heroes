<template>
  <section class="home-page">
    <h1>Home Page</h1>
    <div class="hero">
      <h3>Hero Photo Home Page</h3>
    </div>
    <div class="category">
        <ul>
          <li v-for="proj in this.projs" :key="proj._id">
            <h1>{{proj.name}}</h1>
          </li>
        </ul>

      <div class="img-container">
        <p>Animal Care</p>
        <img @click="projList" src="https://images.unsplash.com/photo-1562548487-a6ffcc5f58db?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="">
        <p>Children</p>
        <img @click="projList" src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="">
        <p>Building</p>
        <img @click="projList" src="http://www.oneworld365.org/img/000/01/1340_l.jpg" alt="">
      </div>

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
      console.log(this.projs)
    }
  },
  created () {
    this.loadProjs()
  }, 
};
</script>
