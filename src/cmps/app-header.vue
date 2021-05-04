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
        <a v-if="currUser" @click="doLogout">Logout</a>
        <router-link v-if="!currUser" to="/login-signup"
          >Login/Signup</router-link
        >
        <router-link v-else class="user-link" to="/user/currUser._id">
          <span @click="nullifyNotifications" class="user-icon"
            >{{ currUser.fullname }}
            <span
              v-if="currUser.notifications > 0 && !requestCount"
              class="notification-counter"
              >{{ currUser.notifications }}</span
            >
            <span
              v-if="!currUser.notifications && requestCount > 0"
              class="notification-counter"
              >{{ requestCount }}</span
            >
          </span>
        </router-link>
        <el-avatar
          v-if="currUser && currUser.imgUrl"
          :size="35"
          :src="avatarImg"
        ></el-avatar>
        <el-avatar v-else :src="defaultAvatar" :size="35"></el-avatar>
      </nav>
      <user-msg />
    </div>
  </div>
</template>

<script>
import { eventBusService, SHOW_MSG } from "../services/eventBusServices.js";
import { socketService } from "../services/socket.service";
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
      if (!this.currUser.imgUrl.includes("http://res.cloudinary.com/")) {
        return require("@/assets/images/avatars/" + this.currUser.imgUrl);
      }
      return this.currUser.imgUrl;
    },
    defaultAvatar() {
      return require("@/assets/images/avatars/Default.svg");
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
    nullifyNotifications() {
      this.currUser.notifications = 0;
      this.$store.dispatch({
        type: "updateUser",
        user: this.currUser,
      });
      this.requestCountToZero();
    },
    doLogout() {
      this.$store.dispatch({ type: "logout" });
      this.$router.push("/");
    },
    increaseCount() {
      this.requestCount += 1;
    },
    async addNotficationsToHost(id) {
      this.$store.dispatch({
        type: "updateNotifications",
        hostId: id,
      });
    },
  },
  created() {
    socketService.setup();
    socketService.on("requestFromUser", (request) => {
      if (!this.currUser) {
        this.addNotficationsToHost(request.proj.host._id);
        return;
      }
      if (this.currUser._id === request.proj.host._id) {
        this.increaseCount();
      } else {
        this.addNotficationsToHost(request.proj.host._id)
      }
    });
  },
  destroyed() {
    socketService.off("requestFromUser");
    socketService.terminate();
  },
  components: {
    userMsg,
  },
};
</script>
