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
        <router-link v-if="currUser" class="user-link" to="/user/userId=1">
          {{ currUser.fullname }} <el-avatar :src="avatarImg" :size="25"/>
          </router-link>
        <router-link v-else to="/login-signup"
          ><i class="fas fa-user-circle"></i
        ></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    avatarImg() {
      return require("@/assets/images/avatars/" + this.currUser.imgUrl);
    },
    currUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  methods: {},
};
</script>
