<template>
  <div id="app">
    <app-header />
    <router-view />
    <app-footer />
  </div>
</template>
<script>
import appHeader from "./cmps/app-header";
import appFooter from "./cmps/app-footer";

export default {
  components: {
    appHeader,
    appFooter,
  },
};
</script>

<style lang="scss">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #3a0171;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
