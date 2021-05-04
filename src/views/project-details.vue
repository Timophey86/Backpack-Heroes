<template>
  <section>
    <div class="loader" v-if="!displayedProj">
      <img src="@/assets/earth .gif" alt="" />
      <h2>Loading...</h2>
    </div>
    <div v-if="displayedProj" class="project-details main-container">
      <div class="details-img-container">
        <div
          v-for="(img, index) in displayedProj.imgUrls"
          :key="index"
          :class="'img-' + (index + 1)"
        >
          <img :src="showImg(img)" />
        </div>
      </div>

      <div class="project-info">
        <h1>{{ displayedProj.name }}</h1>
        <h4>
          Hosted by:
          <span> {{ displayedProj.host.fullname }}</span>
        </h4>
        <h4>
          Location:
          <span class="details-text">{{ displayedProj.loc.address }}</span>
        </h4>
        <h4>
          Duration:
          <span class="details-text"
            >{{ formatDateFrom }} to {{ formatDateTo }}</span
          >
        </h4>
        <h4>Categories:</h4>
        <ul>
          <li v-for="(tags, index) in displayedProj.tags" :key="index">
            {{ tags }}
          </li>
        </ul>
        <div class="project-description">
          <h4>Description:</h4>
          <p>{{ displayedProj.details.description }}</p>
        </div>
        <button
          class="edit-project-details"
          v-if="isHost"
          @click="edit(displayedProj._id)"
        >
          Edit Project Details
        </button>
      </div>
      <div class="members">
        <h3>Vulenteers who decided to join us:</h3>
        <ul v-if="displayedProj.members.length" class="member-list">
          <li v-for="(member, index) in displayedProj.members" :key="index">
            <el-avatar
              :title="member.fullname"
              :src="avatarImg(index)"
              :size="55"
            />
          </li>
        </ul>
        <p class="first-to-join" v-else>
          Be the first to join! Click the join button below.
        </p>
        <p class="spots-left-num">
          <span>{{ spotsLeft }}</span> /
          {{ displayedProj.numOfVolunteersNeeded }} spots left
        </p>
        <p class="amneties">
          As a member these are some of the bonuses we provide for the members
          of our program:
        </p>
        <ul>
          <li
            v-for="(amenities, index) in displayedProj.details.amenities"
            :key="index"
          >
            {{ amenities }}
          </li>
        </ul>

        <el-button
          v-if="!isJoined"
          type="success"
          :class="{ host: isHost }"
          @click="joinProj"
          ><span>{{ joinProjBtnTxt }}</span></el-button
        >
        <el-button v-else type="info" :class="{ host: isHost }"
          ><span>Thank you for joinig us!</span></el-button
        >
      </div>

      <project-review :proj="displayedProj" />
    </div>
  </section>
</template>

<script>
import projectReview from "@/cmps/project-review";
import { socketService } from "../services/socket.service";
export default {
  name: "projectDetails",
  data() {
    return {
      currUser: this.$store.getters.loggedinUser,
      joinProjStatus: true,
      isJoined: false,
      isHost: false,
    };
  },
  computed: {
    displayedProj() {
      return this.$store.getters.projForDetails;
    },
    formatDateFrom() {
      return new Date(this.displayedProj.startsAt).toDateString();
    },
    formatDateTo() {
      return new Date(this.displayedProj.endAt).toDateString();
    },
    joinProjBtnTxt() {
      if (this.joinProjStatus) {
        return "Join Us!";
      } else {
        return "Your Request was sent fo approval";
      }
    },
    spotsLeft() {
      return (
        this.displayedProj.numOfVolunteersNeeded -
        this.displayedProj.members.length
      );
    },
  },
  methods: {
    avatarImg(index) {
      return require("@/assets/images/avatars/" +
        this.displayedProj.members[index].imgUrl);
    },
    img(idx) {
      return this.displayedProj.members[idx].imgUrl;
    },
    async getCurrProj(_id) {
      await this.$store.dispatch({ type: "getProj", _id });
    },
    edit(id) {
      this.$router.push(`/edit/${id}`);
    },
    showImg(idx) {
      if (this.displayedProj.imgUrls[0] === "1") {
        if (this.displayedProj.imgUrls.length) {
          return require(`@/assets/images/${this.displayedProj.tags[0]}/${idx}.jpg`);
        }
        return require("@/assets/images/categories/Agriculture.jpg");
      } else {
        return idx;
      }
    },
    async getCurrUser() {
      await this.$store.dispatch({ type: "loadUsers" });
      this.currUser = this.$store.getters.loggedinUser;
    },
    // async addNotficationsToHost() {
    //   this.$store.dispatch({
    //     type: "updateNotifications",
    //     hostId: this.displayedProj.host._id,
    //   });
    // },
    async joinProj() {
      if (!this.currUser) {
        this.$swal({
          icon: "warning",
          title: "Please Log In to join",
        });
        return;
      }
      if (this.joinProjStatus === false) return;
      await this.$store.dispatch({
        type: "sendOrder",
        user: this.currUser,
        project: this.displayedProj,
      });
      // this.addNotficationsToHost()
      this.toggleJoinProj();
      this.requestSocket();
    },
    toggleJoinProj() {
      this.joinProjStatus = !this.joinProjStatus;
    },
    checkIfUserJoined() {
      if (!this.currUser) return;
      var user = this.displayedProj.members.find((member) => {
        return member._id === this.currUser._id;
      });
      if (this.displayedProj.host._id === this.currUser._id) {
        this.isHost = true;
        this.isJoined = true;
      }
      if (user) {
        this.isJoined = true;
      }
    },
    requestSocket() {
      socketService.emit("joinRequest", {
        user: this.currUser,
        proj: this.displayedProj,
      });
    },
  },
  async created() {
    await this.getCurrProj(this.$route.params.id);
    this.checkIfUserJoined();
    socketService.setup();
  },
  destroyed() {
    this.$store.commit({ type: "getproj", proj: null });
    socketService.off("requestFromUser", this.addMsg);
    socketService.terminate();
  },
  components: {
    projectReview,
  },
};
</script>
