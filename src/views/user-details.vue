<template>
  <div class="user-details-page">
    <h1>User Details Page</h1>
    <div class="user-orders">
      <h3>List of orders Pending/Accepted</h3>
    </div>
      <h3>{{displayedUser}}</h3>
    <div class="user-summary">
      <h3>{{displayedUser.fullname}}</h3>
      <h3>User avatar</h3>
      <h3>User Rating</h3>
      <h3>Pending: NUM</h3>
      <h3>Reservations this month: : NUM</h3>
      <h3>New Reviews: NUM</h3>
    </div>
    <div class="user-projects">
      <h3>List of project that i am hosting</h3>
    </div>
  </div>
</template>


<script>
export default {
  name: "userDetails",
  data() {
    return {
      currUser: null,
    };
  },
  computed: {
    displayedUser() {
      return this.$store.getters.loggedinUser;
    }, 
    pendingOrders() {
    }
  },
  methods: {
    async getUser() {
      await this.$store.dispatch({ type: "loadUsers" });
      this.currUser = this.$store.getters.loggedinUser;
    },
  },
  created() {
    this.getUser();
  },
};
</script>
