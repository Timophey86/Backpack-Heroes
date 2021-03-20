<template>
  <div class="app-header main-container">
    <div class="logo">
      <h1 @click="projList">Backpack Heroes</h1>
    </div>
    <div class="nav">

      <router-link to="/about">About</router-link>
      <router-link to="/login-signup">Login/Signup</router-link>
     <router-link to="/user/userId=1"><i class="fas fa-user-circle"></i></router-link>
    </div>


  </div>
</template>

<script>

export default {
  methods: {
    projList() {
      this.$router.push("/");
    }
  },
}

</script>
