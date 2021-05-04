<template>
  <div v-if="currUser" class="user-details main-container">
    <div class="user-profile">
      <!-- <img :src="avatarImg" alt="" /> -->
      <el-image v-if="currUser.imgUrl" :src="avatarImg" fit="cover"></el-image>

      <el-image v-else :src="defaultAvatar" fit="cover"> </el-image>
      <el-button
        v-if="!currUser.imgUrl"
        :loading="isLoading"
        size="mini"
        @click="triggerFileInput"
        >Add profile pic</el-button
      >
      <el-button
        v-else
        :loading="isLoading"
        size="mini"
        @click="triggerFileInput"
        >Update profile pic</el-button
      >
      <input
        type="file"
        ref="fileInput"
        style="display: none"
        @change="onUploadImg"
      />
      <h1>Hello, {{ currUser.fullname }}!</h1>
      <p>
        {{ currUser.about }}
      </p>
      <div class="email-and-edit-btn">
        <span class="user-email">My-Email: {{ currUser.email }}</span>
        <el-button size="mini" @click="showForm">Edit Profile</el-button>
      </div>
    </div>
    <transition name="el-zoom-in-center">
      <el-form
        v-if="isShowForm"
        @submit.prevent.native="addReview"
        class="edit-user-form"
      >
        <h2>Edit Details:</h2>
        <el-form-item label="My email:">
          <el-input v-model="currUser.email" />
        </el-form-item>
        <el-form-item label="About me:">
          <el-input
            type="textarea"
            :rows="10"
            placeholder="Your Opinion Matters..."
            v-model="currUser.about"
            maxlength="600"
            show-word-limit
            resize="none"
          />
        </el-form-item>
        <el-button
          type="success"
          size="medium"
          @click.prevent="updateUserDetails"
          >Update</el-button
        >
        <el-button
          class="close-edit"
          size="mini"
          icon="el-icon-close"
          @click.prevent="hideForm"
        />
      </el-form>
      <user-preview
        @onCloseModal="closeModal"
        v-if="userPreviewId"
        :userId="userPreviewId"
      />
    </transition>
    <div class="table-container">
      <el-tabs :tab-position="tabPosition">
        <el-tab-pane>
          <span slot="label">My Projects ({{ userProjectsLength }})</span>
          <div class="user-projects">
            <h4>My Projects:</h4>
            <div v-if="userProjects" class="back-office-projs">
              <el-table :data="userProjects" stripe border max-height="250">
                <el-table-column
                  fixed
                  prop="name"
                  label="Name"
                  :width="columnWidth"
                >
                </el-table-column>
                <el-table-column
                  prop="startsAt"
                  :formatter="formatDate"
                  label="Starts At"
                  width="150"
                >
                </el-table-column>
                <el-table-column
                  prop="endAt"
                  :formatter="formatDate"
                  label="Ends At"
                  width="150"
                >
                </el-table-column>
                <el-table-column
                  prop="numOfVolunteersNeeded"
                  label="Needed"
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  prop="members.length"
                  label="Enrolled"
                  width="100"
                >
                </el-table-column>
                <el-table-column label="Actions">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="
                        edit(userProjects[scope.$index]._id)
                      "
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
              <button class="btn" @click="goToEdit()">
                Add a new project!
              </button>
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
                  ><span
                    class="goToProj"
                    @click="goToProjectPage(order.proj._id)"
                    >{{ order.proj.name }} </span
                  ><br />
                  <span>Dates: </span>March 17th 2021 to November 19th 2033
                  <br />
                  <span>Status: </span
                  ><span :class="order.status">{{ order.status }}</span>
                </li>
              </ul>
            </div>
            <div v-else>Not signed for any project yet</div>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"
            >Admission Requests ({{ pendingOrdersLength }})</span
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
                  <span>Applicants Name: </span
                  ><span
                    class="applicants-name"
                    @click="showUseDetails(order.member._id)"
                    >{{ order.member.fullname }}</span
                  >
                  <br />
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
    </div>
  </div>
  <div v-else>Please use the login page to log in or sign up.</div>
</template>

<script>
import { uploadImg } from "../services/img-upload.service";
import chart from "@/cmps/charts";
import userPreview from "../cmps/user.preview.cmp";
export default {
  name: "userDetails",
  data() {
    return {
      currUser: null,
      userOrders: null,
      chartdata: this.fillData(),
      isLoading: false,
      isShowForm: false,
      userPreviewId: null,
      windowWidth: window.innerWidth,
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
      if (!this.currUser.imgUrl.includes("http://res.cloudinary.com/")) {
        return require("@/assets/images/avatars/" + this.currUser.imgUrl);
      }
      return this.currUser.imgUrl;
    },
    tabPosition() {
      if (this.windowWidth < 800) {
        return "top";
      } else {
        return "left";
      }
    },
    columnWidth() {
      if (this.windowWidth < 600) {
        return 150;
      } else {
        return 250;
      }
    },
    defaultAvatar() {
      return require("@/assets/images/avatars/Default.svg");
    },
    userProjects() {
      return this.$store.getters.projs;
    },
    pendingOrders() {
      if (this.userOrders) {
        if (!this.userOrders.host) return;
        return this.userOrders.host.filter((order) => {
          return order.status === "pending";
        });
      }
      return null;
    },
    approvedOrders() {
      if (this.userOrders) {
        if (!this.userOrders.host) return;
        return this.userOrders.host.filter((order) => {
          return order.status === "approved";
        });
      }
      return null;
    },
    myRequests() {
      if (this.userOrders) {
        return this.userOrders.reserved || 0;
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
    hideForm() {
      this.isShowForm = false;
    },
    showForm() {
      this.isShowForm = true;
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
    resetFilter() {
      this.$store.commit({
        type: "setFilter",
        filter: { category: "", location: "", from: "", to: "", pageDiff: 0 },
      });
    },
    goToProjectPage(id) {
      this.$router.push(`/project/${id}`);
    },
    formatDate(row, column, timeStamp) {
      return new Date(timeStamp).toDateString();
    },
    doLogout() {
      this.$store.dispatch({ type: "logout" });
      this.$router.push("/");
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    async updateUserDetails() {
      await this.$store.dispatch({ type: "updateUser", user: this.currUser });
      this.isShowForm = false;
    },
    async onUploadImg(ev) {
      this.isLoading = true;
      const res = await uploadImg(ev);
      this.currUser.imgUrl = res.url;
      console.log(this.currUser);
      await this.$store.dispatch({ type: "updateUser", user: this.currUser });
      this.isLoading = false;
    },
    showUseDetails(id) {
      this.userPreviewId = id;
    },
    closeModal() {
      this.userPreviewId = null;
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
    onResize() {
      this.windowWidth = window.innerWidth;
    },
  },
  created() {
    this.currUser = this.$store.getters.loggedinUser;
    this.resetFilter();
    this.getUserProjects();
    this.getUserOrders();
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  components: {
    chart,
    userPreview,
  },
  destroyed() {
    this.$store.commit({ type: "setProjs", projs: [] });
  },
};
</script>
