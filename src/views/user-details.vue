<template>
  <div v-if="currUser" class="user-details main-container">
    <div class="user-profile">
      <!-- <img :src="avatarImg" alt="" /> -->
      <el-image
      :src="avatarImg"
      fit="cover"></el-image>
      <h1>Hello, {{ currUser.fullname }}!</h1>
      <p>
        Hello, im Shiran a volunteer project manager from Israel. <br />
        Currently residing in Thailand. <br />
        My passion is helping others and my speciality is educational projects,
        working with special needs children, and community management.<br />
        I love traveling, basketball, and mountain biking. <br />
        I'm here to connect with other amazing people who share the same passion
        for traveling and helping others, just like myself.
      </p>
      <br />
    </div>
    <el-tabs tab-position="left">
      <el-tab-pane>
        <span slot="label">My Projects ({{ userProjectsLength }})</span>
        <div class="user-projects">
          <h4>My Projects:</h4>
          <div v-if="userProjects" class="back-office-projs">
            <el-table :data="userProjects" stripe border max-height="250">
              <el-table-column fixed prop="name" label="Name" width="250">
              </el-table-column>
              <el-table-column prop="startsAt" label="StartAt">
              </el-table-column>
              <el-table-column prop="endAt" label="EndAt"> </el-table-column>
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
              <el-table-column label="Actions">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="edit(userProjects[scope.$index]._id)"
                    type="text"
                    size="small"
                    >Edit</el-button
                  >
                  <el-button
                    @click.native.prevent="
                      removeProj(userProjects[scope.$index]._id)
                    "
                    type="text"
                    size="small"
                    >Remove</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <button class="btn" @click="goToEdit()">Add a new project!</button>
          </div>
          <div v-else>No projects to display</div>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">My Adventures ({{ myRequestsLength }})</span>
        <div class="adventures">
          <h4>Your future adventures:</h4>
          <div v-if="myRequests">
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
        <span slot="label">Admission Requests ({{ pendingOrdersLength }})</span>
        <div class="admission-requests">
          <h4>Admission requests:</h4>
          <div v-if="pendingOrders">
            <ul>
              <li
                class="pending"
                v-for="(order, index) in pendingOrders"
                :key="index"
              >
                <span>Applicants Name: </span>{{ order.member.fullname }}
                <span>Projects Name: </span
                ><span
                  class="goToProj"
                  @click="goToProjectPage(order.proj._id)"
                  >{{ order.proj.name }}</span
                >
                <br />
                <h4>Press to approve:</h4>
                <span
                  ><button @click="approve(order)">Approve</button>
                  <button @click="remove(order)">Reject</button></span
                >
              </li>
            </ul>
          </div>
          <div v-else>No Pending Reservations</div>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">Approved Orders ({{ approvedOrdersLength }})</span>
        <div class="approved-orders" v-if="approvedOrders">
          <h4>Reservations this month:</h4>
          <ul>
            <li
              class="reservations"
              v-for="(order, index) in approvedOrders"
              :key="index"
            >
              <h4>
                Applicants Name: <span>{{ order.member.fullname }} </span>
              </h4>
              <h4>Projects Name:</h4>
              <span
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
    <el-button class="logout-btn" @click="doLogout" type="danger" round>Logout</el-button>
    <!-- <chart :chartdata="chartdata" /> -->
    <!-- <button @click="fillData">click</button> -->
  </div>
  <div v-else>Please use the login page to log in or sign up.</div>
</template>

<script>
import { socketService } from "../services/socket.service";
import { showMsg } from "../services/eventBusServices.js";
import { increaseCount } from "../services/eventBusServices.js";
import chart from "@/cmps/charts";
export default {
  name: "userDetails",
  data() {
    return {
      currUser: null,
      userOrders: null,
      chartdata: this.fillData(),
    };
  },
  computed: {
    approvedOrdersLength() {
      return this.approvedOrders?.length || 0;
    },
    myRequestsLength() {
      return this.myRequests?.length || 0;
    },
    userProjectsLength() {
      return this.userProjects?.length || 0;
    },
    pendingOrdersLength() {
      return this.pendingOrders?.length || 0;
    },
    avatarImg() {
      return require("@/assets/images/avatars/" + this.currUser.imgUrl);
      // return this.currUser.imgUrl;
    },
    userProjects() {
      return this.$store.getters.projs;
    },
    pendingOrders() {
      if (this.userOrders) {
        if (!this.userOrders.host) return 
        return this.userOrders.host.filter((order) => {
          return order.status === "pending";
        });
      }
    },
    approvedOrders() {
      if (this.userOrders) {
         if (!this.userOrders.host) return 
        return this.userOrders.host.filter((order) => {
          return order.status === "approved";
        });
      }
    },
    myRequests() {
      if (this.userOrders) {
        return this.userOrders.reserved || 0;
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
    avatarImg() {
      return require("@/assets/images/avatars/" + this.currUser.imgUrl);
    },
  },
  methods: {
    async approve(order) {
      var newOrder = JSON.parse(JSON.stringify(order));
      newOrder.status = "approved";
      await this.$store.dispatch({ type: "approveOrder", order: newOrder });
      this.getUserOrders();
    },
    async remove(order) {
      await this.$store.dispatch({ type: "removeOrder", order });
      this.getUserOrders();
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
    async getUserOrders() {
      try {
        await this.$store.dispatch({
          type: "loadOrders",
          filter: { userId: this.currUser._id },
        });
        this.userOrders = this.$store.getters.orders;
      } catch (err) {
        console.log(
          "orderStore: Error in getting use orders to the frontend",
          err
        );
        throw err;
      }
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
    formatDate(timeStamp) {
      return new Date(timeStamp).toDateString();
    },
    doLogout() {
      this.$store.dispatch({ type: "logout" });
      this.$router.push("/");
    },
    fillData() {
      this.chartdata = {
        labels: [
          "Approved Orders",
          "My Requests",
          "My Projects",
          "Pending Orders",
        ],
        datasets: [
          {
            backgroundColor: "#f87979",
            data: [this.userProjectsLength],
          },
          {
            backgroundColor: "#f87979",
            data: [this.approvedOrdersLength],
          },
          {
            backgroundColor: "#f87979",
            data: [this.myRequestsLength],
          },

          {
            backgroundColor: "#f87979",
            data: [this.pendingOrdersLength],
          },
        ],
      };
    },
  },
  created() {
    this.currUser = this.$store.getters.loggedinUser;
    this.getUserProjects();
    this.getUserOrders();
    socketService.setup();
    socketService.on("requestFromUser", (request) => {
      console.log("user details");
      if (this.currUser._id === request.proj.host._id) {
        increaseCount();
      } else {
        return;
      }
    });
    this.fillData();
  },

  components: {
    chart,
  },
  destroyed() {
    socketService.off("requestFromUser", this.addMsg);
    socketService.terminate();
  },
};
</script>
