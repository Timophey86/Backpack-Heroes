<template>
  <div class="app-header">
    <div class="header main-container">
      <div class="logo">
        <router-link to="/">Backpack Heroes</router-link>
      </div>
<<<<<<< HEAD

      <div class="menu" @click="toggleMenu"><i class="fas fa-bars"></i></div>

      <nav :class="menuClass">
        <router-link to="/project">Explore</router-link>
        <router-link to="/login-signup">Login/Signup</router-link>
        <router-link v-if="currUser" class="user-link" to="/user/userId=1"
          ><i class="fas fa-user-circle"></i
          >{{ currUser.fullname }}</router-link
        >
        <router-link v-else class="user-link" to="/user/userId=1"
          ><i class="fas fa-user-circle"></i
        ></router-link>
      </nav>
=======
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
>>>>>>> 52a681c843989f3af35bd73e346be477b2ac76c7
    </div>
  </div>
</template>

<script>
export default {
  data() {
<<<<<<< HEAD
    return {
      menuClass: "closeMenu",
    };
=======
    return {};
>>>>>>> 52a681c843989f3af35bd73e346be477b2ac76c7
  },
  computed: {
    avatarImg() {
      return require("@/assets/images/avatars/" + this.currUser.imgUrl);
    },
    currUser() {
      return this.$store.getters.loggedinUser;
    },
<<<<<<< HEAD
  },
  methods: {
    toggleMenu() {
      if (this.menuClass === "openMenu") {
        this.menuClass = "closeMenu";
      } else {
        this.menuClass = "openMenu";
      }
    },
=======
>>>>>>> 52a681c843989f3af35bd73e346be477b2ac76c7
  },
  methods: {},
};
</script>
