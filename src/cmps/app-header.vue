<template>
  <div class="app-header">
    <div class="header main-container">
      <div class="logo">
        <router-link to="/">Backpack Heroes</router-link>
      </div>
    <div class="nav">
      <router-link to="/project">Explore</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/login-signup">Login/Signup</router-link>
      <router-link v-if="currUser" class="user-link" to="/user/userId=1"
        ><i class="fas fa-user-circle"></i
      > {{currUser.fullname}}</router-link>
      <router-link v-else class="user-link" to="/user/userId=1"
        ><i class="fas fa-user-circle"></i
      ></router-link>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    currUser() {
      return this.$store.getters.loggedinUser
    }
  },
  methods: {
  },
};
</script>
