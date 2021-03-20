<template>
  <div class="app-header">
  <div class="header main-container">
    <div class="logo">
      <router-link to="/">Backpack Heroes</router-link>
    </div>
    <div class="nav">

      <router-link to="/about">About</router-link>
      <router-link to="/login-signup">Login/Signup</router-link>
     <router-link to="/user/userId=1"><i class="fas fa-user-circle"></i></router-link>
    </div>
  </div>
  </div>
</template>

<script>

export default {
  methods: {
  },
}

</script>
