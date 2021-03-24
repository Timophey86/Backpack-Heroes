<template>
  <div v-if="currUser" class="user-details-page main-container">
    <div class="user-summary">
      <h3>Welcome {{ displayedUser.fullname }}</h3>
      <hr />
      <h4>Admission requests:</h4>
      <div v-if="pendingOrders">
        <ul>
          <li
            class="pending"
            v-for="(order, index) in pendingOrders"
            :key="index"
          >
            <span>Applicants Name: </span>{{ order.member.fullname }} <br />
            <span>Projects Name: </span>{{ order.proj.name }} <br />
            <span>Press to approve: </span
            ><button @click="approve(order)">Approve</button>
            <button @click="remove(order)">Reject</button>
          </li>
        </ul>
      </div>
      <div v-else>No Pending Reservations</div>
      <hr />
      <div v-if="approvedOrders">
        <h4>Reservations this month:</h4>
        <ul>
          <li
            class="reservations"
            v-for="(order, index) in approvedOrders"
            :key="index"
          >
            <span>Applicants Name: </span>{{ order.member.fullname }} <br />
            <span>Projects Name: </span>{{ order.proj.name }} <br />
            <span>Status: </span><span class="approved">Approved</span>
            <button @click="remove(order)">Delete</button>
          </li>
        </ul>
      </div>
      <div v-else>No approved reservations yet</div>
      <hr />
      <h4>Your future adventures:</h4>
      <div v-if="myRequests && myRequests.length">
        <ul>
          <li
            class="reservations"
            v-for="(order, index) in myRequests"
            :key="index"
          >
            <span>Projects Name: </span>{{ order.proj.name }} <br />
            <span>Dates: </span>March 17th 2021 to November 19th 2033 <br />
            <span>Status: </span
            ><span :class="order.status">{{ order.status }}</span>
          </li>
        </ul>
      </div>
      <div v-else>Not signed for any project yet</div>
      <hr />
      <h4>Your Projects:</h4>
      <div v-if="userProjects" class="back-office-projs">
        <table>
      <tr v-for="proj in userProjects" :key="proj._id">
       <th> <span class="myProjs">{{ proj.name }}</span
        ></th>
        <th><button @click="removeProj(proj._id)">Remove</button
        ></th>
        <th><button @click="edit(proj._id)">Edit</button></th>
      </tr>
      </table>
      </div>
      <div v-else>No projects to display</div>
    </div>
  </div>
  <div v-else>Please use the login page to log in or sign up.</div>
</template>


<script>
import elTable from "../cmps/table.vue";

export default {
  name: "userDetails",
  data() {
    return {
      currUser: null,
      userOrders: null,
    };
  },
  computed: {
    displayedUser() {
      return this.$store.getters.loggedinUser;
    },
    userProjects() {
      return this.$store.getters.projs;
    },
    pendingOrders() {
      if (this.userOrders) {
        const pendingOrders = [];
        this.userOrders.host.forEach((order) => {
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
      if (this.userOrders) {
        const approvedOrders = [];
        this.userOrders.host.forEach((order) => {
          if (order.status === "approved") {
            approvedOrders.push(order);
          }
        });
        if (!approvedOrders.length) {
          return null;
        } else {
          return approvedOrders;
        }
      } else return null;
    },
    myRequests() {
      if (this.userOrders) {
        return this.userOrders.reserved;
      }
    },
  },
  methods: {
    async approve(order) {
      var newOrder = JSON.parse(JSON.stringify(order));
      newOrder.status = "approved";
      await this.$store.dispatch({ type: "approveOrder", order: newOrder });
      this.getRequests();
    },
    async remove(order) {
      await this.$store.dispatch({ type: "removeOrder", order });
      this.getRequests();
    },
    async removeProj(projId) {
      await this.$store.dispatch({ type: "removeProj", projId });
      this.getUserProjects();
    },
    edit(id) {
      this.$router.push(`/edit/${id}`);
    },
    async getRequests() {
      await this.$store.dispatch({
        type: "loadOrders",
        filter: { userId: this.currUser._id },
      });
      this.userOrders = this.$store.getters.orders;
    },
    async getUserProjects() {
      await this.$store.dispatch({
        type: "loadProjs",
        filter: { userId: this.currUser._id },
      });
    },
  },
  async created() {
    this.currUser = this.$store.getters.loggedinUser;
    this.getUserProjects();
    this.getRequests();
  },
  components: {
    elTable,
  },
};
</script>
