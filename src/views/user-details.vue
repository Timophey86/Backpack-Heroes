<template>
  <div v-if="currUser" class="user-details-page main-container">
    <div class="user-summary">
      <div class="main-user-profile">
        <div class="name-and-pic">
          <h2>Welcome {{ displayedUser.fullname }}</h2>
          <img
            :src="`https://randomuser.me/api/portraits/${maleFemale}/${getRandomNum}.jpg`"
            alt=""
          />
        </div>
        <div class="adventures">
          <h4>Your future adventures:</h4>
          <div v-if="myRequests && myRequests.length">
            <ul>
              <li
                class="reservations"
                v-for="(order, index) in myRequests"
                :key="index"
              >
                <span>Projects Name: </span
                ><span class="goToProj" @click="goToProjectPage(order.proj._id)"
                  >{{ order.proj.name }} </span
                ><br />
                <span>Dates: </span>March 17th 2021 to November 19th 2033 <br />
                <span>Status: </span
                ><span :class="order.status">{{ order.status }}</span>
              </li>
            </ul>
          </div>
          <div v-else>Not signed for any project yet</div>
        </div>
      </div>
      <hr />
      <h4>Your Projects:</h4>
      <div v-if="userProjects && userProjects.length" class="back-office-projs">
        <table>
          <th>Name</th>
          <th>Dates</th>
          <th>Needed</th>
          <th>Enrolled</th>
          <th>Actions</th>
          <tr v-for="proj in userProjects" :key="proj._id">
            <td class="goToProj" @click="goToProjectPage(proj._id)">
              <span class="myProjs">{{ proj.name }}</span>
            </td>
            <td>
              {{ formatDateFrom(proj.startsAt) | moment("MM/DD/YY") }}-{{
                formatDateTo(proj.endAt) | moment("MM/DD/YY")
              }}
            </td>
            <td>{{ proj.numOfVolunteersNeeded }}</td>
            <td>{{ proj.members.length }}</td>
            <td>
              <button @click="removeProj(proj._id)">Remove</button
              ><button @click="edit(proj._id)">Edit</button>
            </td>
          </tr>
        </table>
      </div>
      <div v-else>No projects to display</div>
      <button class="btn" @click="goToEdit()">Add a new project!</button>
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
            <span>Projects Name: </span
            ><span class="goToProj" @click="goToProjectPage(order.proj._id)">{{
              order.proj.name
            }}</span>
            <br />
            <span>Press to approve: </span
            ><button @click="approve(order)">Approve</button>
            <button @click="remove(order)">Reject</button>
          </li>
        </ul>
      </div>
      <div v-else>No Pending Reservations</div>
      <hr class="dotted" />
      <div v-if="approvedOrders">
        <h4>Reservations this month:</h4>
        <ul>
          <li
            class="reservations"
            v-for="(order, index) in approvedOrders"
            :key="index"
          >
            <span>Applicants Name: </span>{{ order.member.fullname }} <br />
            <span>Projects Name: </span
            ><span
              class="goToProj"
              @click="goToProjectPage(order.proj._id)"
            ></span
            >{{ order.proj.name }} <br />
            <span>Status: </span><span class="approved">Approved</span>
            <button @click="remove(order)">Delete</button>
          </li>
        </ul>
      </div>
      <div v-else>No approved reservations yet</div>
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
    maleFemale() {
      if (Math.random() > 0.5) {
        return "women";
      } else {
        return "men";
      }
    },
    getRandomNum() {
     var min = Math.ceil(1);
     var max = Math.floor(99);
      return Math.floor(Math.random() * (max - min + 1) + min);
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
    goToEdit() {
      this.$router.push(`/edit/`);
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
    goToProjectPage(id) {
      this.$router.push(`/project/${id}`);
    },
    formatDateFrom(timeStamp) {
      return new Date(timeStamp).toDateString();
    },
    formatDateTo(timeStamp) {
      return new Date(timeStamp).toDateString();
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
