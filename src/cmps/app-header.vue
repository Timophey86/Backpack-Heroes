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
          ><i class="fas fa-user-circle"></i
          >{{ currUser.fullname }}</router-link
        >
        <router-link v-else class="user-link" to="/user/userId=1"
          ><i class="fas fa-user-circle"></i
        ></router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuClass: "closeMenu",
    };
  },
  computed: {
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
};
</script>
