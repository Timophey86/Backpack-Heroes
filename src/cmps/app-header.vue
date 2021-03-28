<template>
  <div class="app-header">
    <div class="header main-container">
      <div class="logo">
        <router-link to="/">Backpack Heroes</router-link>
      </div>

      <div class="menu" @click="toggleMenu"><i class="fas fa-bars"></i></div>

      <nav :class="menuClass">
        <router-link to="/project">Explore</router-link>
        <router-link to="/login-signup">Login/Signup</router-link>
        <router-link v-if="currUser" class="user-link" to="/user/userId=1"
          > 
          <span class="user-icon"><i class="fas fa-user-circle"></i
          ><span v-if="requestCount>0" class="notification-counter">1</span></span>
          {{ currUser.fullname }}</router-link
        >
        <router-link v-else class="user-link" to="/user/userId=1"
          ><i class="fas fa-user-circle"></i
        ></router-link>
      </nav>
      <user-msg />
    </div>
  </div>
</template>

<script>
import {eventBusService, SHOW_MSG} from '../services/eventBusServices.js'
import userMsg from "./alert-msg.cmp";

export default {
  data() {
    return {
      menuClass: "closeMenu",
      requestCount: 1
    };
  },
  computed: {
    avatarImg() {
      return require("@/assets/images/avatars/" + this.currUser.imgUrl);
    },
    currUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  methods: {
    toggleMenu() {
      if (this.menuClass === "openMenu") {
        this.menuClass = "closeMenu";
      } else {
        this.menuClass = "openMenu";
      }
    },
  },
  created() {
     eventBusService.$on(SHOW_MSG, (msg) => {
      this.msg = msg;
      var delay = msg.delay || 5000;
      this.alive = true;
      setTimeout(() => {
        this.alive = false;
      }, delay);
    });
  },
  components: {
    userMsg,
  },
};
</script>
