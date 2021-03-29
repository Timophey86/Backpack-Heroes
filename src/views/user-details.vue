<template>
  <div v-if="currUser" class="user-details main-container">
    <div class="user-profile">
      <img :src="avatarImg" alt="" />
      <h2>Hello, {{ currUser.fullname }}</h2>
    </div>
    <el-tabs tab-position="left">
      <el-tab-pane>
        <span slot="label">My Adventures ({{ myRequests.length }})</span>
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
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">My Projects ({{ userProjects.length }})</span>
        <div class="user-projects">
          <button class="btn" @click="goToEdit()">Add a new project!</button>
          <h4>My Projects:</h4>
          <div
            v-if="userProjects && userProjects.length"
            class="back-office-projs"
          >
            <el-table :data="userProjects" stripe border>
              <el-table-column fixed prop="name" label="Name">
              </el-table-column>
              <el-table-column prop="startsAt" label="StartAt" width="120">
              </el-table-column>
              <el-table-column prop="endAt" label="EndAt" width="120">
              </el-table-column>
              <el-table-column
                prop="numOfVolunteersNeeded"
                label="Needed"
                width="120"
              >
              </el-table-column>
              <el-table-column
                prop="members.length"
                label="Enrolled"
                width="120"
              >
              </el-table-column>
              <el-table-column label="Actions" width="120">
                <el-button
                  @click.native.prevent="edit(userProjects._id)"
                  type="text"
                  size="small"
                  >Edit</el-button
                >
                <el-button
                  @click.native.prevent="removeProj(userProjects._id)"
                  type="text"
                  size="small"
                  >Remove</el-button
                >
              </el-table-column>
            </el-table>
            <!-- <table>
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
            </table> -->
          </div>
          <div v-else>No projects to display</div>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"
          >Admission Requests ({{ pendingOrders.length }})</span
        >
        <div class="admission-requests">
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
                ><span
                  class="goToProj"
                  @click="goToProjectPage(order.proj._id)"
                  >{{ order.proj.name }}</span
                >
                <br />
                <span>Press to approve: </span
                ><button @click="approve(order)">Approve</button>
                <button @click="remove(order)">Reject</button>
              </li>
            </ul>
          </div>
          <div v-else>No Pending Reservations</div>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">Approved Orders ({{ approvedOrders.length }})</span>
        <div class="approved-orders" v-if="approvedOrders">
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
        <p v-else>No approved reservations yet</p>
      </el-tab-pane>
    </el-tabs>
  </div>

  <div v-else>Please use the login page to log in or sign up.</div>
</template>

<script>
import { socketService } from "../services/socket.service";
import { showMsg } from "../services/eventBusServices.js";
import { increaseCount } from "../services/eventBusServices.js";

export default {
  name: "userDetails",
  data() {
    return {
      currUser: null,
      userOrders: null,
    };
  },
  computed: {
    avatarImg() {
      return require("@/assets/images/avatars/" + this.currUser.imgUrl);
      // return this.currUser.imgUrl;
    },
    userProjects() {
      return this.$store.getters.projs;
    },
    pendingOrders() {
      if (this.userOrders) {
        var test = [];
        return this.userOrders.host.filter((order) => {
          return order.status === "pending";
        });
      }
    },
    approvedOrders() {
      if (this.userOrders) {
        return this.userOrders.host.filter((order) => {
          return order.status === "approved";
        });
      }
    },
    myRequests() {
      if (this.userOrders) {
        return this.userOrders.reserved;
      }
      return 0;
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
  created() {
    this.currUser = this.$store.getters.loggedinUser;
    this.getUserProjects();
    this.getRequests();
    socketService.setup();
    socketService.on("requestFromUser", (request) => {
      if (this.cuurUser._id === request.proj.host._id) {
        increaseCount();
      } else {
        return;
      }
    });
  },
};
</script>
