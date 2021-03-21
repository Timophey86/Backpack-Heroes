<template>
  <div v-if="currUser" class="user-details-page main-container">
    <div class="user-summary">
      <h3>Welcome {{ displayedUser.fullname }}</h3>
      <!-- <h3>User avatar</h3> -->
      <!-- <h3>User Rating</h3> -->
      <hr>
      <h4>Admission requests:</h4>
      <div v-if="pendingOrders">
        <ul>
        <li class="pending" v-for="(order, index) in pendingOrders" :key="index">
          <span>Applicants Name: </span>{{ order.member.fullName }} <br />
          <span>Projects Name: </span>{{ order.proj.name }} <br />
          <span>Press to approve: </span
          ><button @click="approve(order)">Approve</button>
        </li>
        </ul>
      </div>
      <div v-else>No Pending Reservations</div>
      <hr>
      <div v-if="approvedOrders">
        <h4>Reservations this month:</h4>
        <ul>
        <li class="reservations" v-for="(order, index) in approvedOrders" :key="index">
          <span>Applicants Name: </span>{{ order.member.fullName }} <br />
          <span>Projects Name: </span>{{ order.proj.name }} <br />
          <span>Status: </span><span class="approved">Approved</span>
        </li>
        </ul>
      </div>
      <div v-else>No approved reservations yet</div>
         <hr>
         <h4>Your future adventures:</h4>
        <div v-if="approvedOrders || pendingOrders">
        <ul>
        <li class="reservations" v-for="(order, index) in displayedUser.orders" :key="index">
          <!-- <span>Applicants Name: </span>{{ order.member.fullName }} <br /> -->
          <span>Projects Name: </span>{{ order.proj.name }} <br />
          <span>Dates: </span>March 17th 2021 to  November 19th 2033 <br />
          <span>Status: </span><span :class="order.status">{{order.status}}</span>
        </li>
        </ul>
      </div>
      <div v-else>Not signed for any project yet</div>
    </div>
  </div>
</template>


<script>
import elTable from "../cmps/table.vue"

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
      if (this.currUser.orders) {
        const pendingOrders = [];
        this.currUser.orders.forEach((order) => {
          if (order.status === "pending") {
            pendingOrders.push(order);
          }
        });
        if (!pendingOrders[0]) {
          return null;
        } else {
          return pendingOrders;
        }
      } else return null;
    },
    approvedOrders() {
      if (this.currUser.orders) {
        const pendingOrders = [];
        this.currUser.orders.forEach((order) => {
          if (order.status === "approved") {
            pendingOrders.push(order);
          }
        });
        if (!pendingOrders.length) {
          return null;
        } else {
          return pendingOrders;
        }
      } else return null;
    },
  },
  methods: {
    async getUser() {
      await this.$store.dispatch({ type: "loadUsers" });
      this.currUser = this.$store.getters.loggedinUser;
    },
    async approve(order) {
      var newOrder = JSON.parse(JSON.stringify(order));
      newOrder.status = "approved";
      await this.$store.dispatch({ type: "updateUserOrder", order: newOrder });
      await this.$store.dispatch({ type: "approveOrder", order: newOrder });
      this.getUser();
    },
  },
  created() {
    this.getUser();
  },
  components: {
    elTable
  }
};
</script>
