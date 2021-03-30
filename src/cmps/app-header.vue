<template>
  <div class="app-header">
    <div class="header main-container">
      <div class="logo">
        <router-link to="/"
          ><img
            class="svg-image"
            src="../assets/images/output-onlinepngtools (2).png"
            alt=""
          />
          Backpack Heroes</router-link
        >
      </div>

      <div class="menu" @click="toggleMenu"><i class="fas fa-bars"></i></div>

      <nav :class="menuClass">
        <router-link to="/project">Explore</router-link>
        <router-link v-if="!currUser" to="/login-signup"
          >Login/Signup</router-link
        >
        <router-link v-else class="user-link" to="/user/currUser._id">
          <span @click="requestCountToZero" class="user-icon">{{ currUser.fullname }}
           <span v-if="requestCount > 0" class="notification-counter" >{{
              requestCount
            }}</span> 
          </span>

         
        </router-link>
        <el-avatar v-if="currUser" :size="35" :src="avatarImg"></el-avatar>
        <el-avatar v-else :size="35" icon="el-icon-user-solid"></el-avatar>

        <!-- <router-link v-else class="user-link" to="/user/userId=1">
          <i class="fas fa-user-circle"></i>
        </router-link> -->
      </nav>
      <user-msg />
    </div>
  </div>
</template>

<script>
import { eventBusService, SHOW_MSG } from "../services/eventBusServices.js";
import userMsg from "./alert-msg.cmp";

export default {
  data() {
    return {
      menuClass: "closeMenu",
      requestCount: 0,
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
    requestCountToZero() {
      this.requestCount = 0;
    },
  },
  created() {
    eventBusService.$on("addCount", () => {
      this.requestCount += 1;
    });
  },
  components: {
    userMsg,
  },
};
</script>
