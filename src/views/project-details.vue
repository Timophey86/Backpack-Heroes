<template>
  <div v-if="displayedProj" class="project-details-page main-container">
    <div class="details-img-container">
      <div
        :class="'img-' + img"
        v-for="(img, index) in displayedProj.imgUrls"
        :key="index"
      
      >
        <img :src="require(`../assets/images/${displayedProj.tags[0]}/${img}.jpg`)"  alt=""/>
      </div>
    </div>
    <div class="main-details">
      <div class="proj-details">
        <h2>{{ displayedProj.name }}</h2>
        <h4>Hosted by: {{ displayedProj.host.fullname }}</h4>
        <div class="location-details">
          Project Location: <span>{{ displayedProj.loc.address }}</span>
        </div>
        <div class="dates-details">
          Project Duration: <span>{{ formatDateFrom }}</span> to
          <span>{{ formatDateTo }}</span>
        </div>
        Categories:
        <ul>
          <li v-for="(tags, index) in displayedProj.tags" :key="index">
            {{ tags }}
          </li>
        </ul>
        <div class="displyed-proj-details">
        <p>{{ displayedProj.details.description }}</p>
        </div>
        <button @click="edit(displayedProj._id)">Edit Project Details</button>
      </div>

      <div class="members-div">
        <h2>Members who decided to join us:</h2>
        <ul class="member-list">
          <li v-for="(members, index) in displayedProj.members" :key="index">
         <el-avatar :size="55">{{members.fullname}}</el-avatar>
          </li>
        </ul>
        <p class="amneties">As a member these are some of the bonuses we provide for the members of our program:
            <ul>
          <li v-for="(amenities, index) in displayedProj.details.amenities" :key="index">
            {{amenities}}
          </li>
        </ul>
        </p>
        <!-- <button v-if="!isJoined" @click="joinProj">{{joinProjBtnTxt}}</button> -->
            <el-button v-if="!isJoined" type="success"  @click="joinProj">{{joinProjBtnTxt}}</el-button>
            <el-button v-else type="info" >Thank you for joinig us!</el-button>
        <!-- <button v-else>Thank you for joinig us!</button> -->
    </div>
  </div>
  
        <project-review :proj="displayedProj" />
  
    
  </div>
</template>

<script>
import projectReview from "@/cmps/project-review";
export default {
  name: "projectDetails",
  data() {
    return {
      currUser: null,
      joinProjStatus: true,
      isJoined: false
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
  },
  methods: {
    getCurrProj(_id) {
      this.$store.dispatch({ type: "getProj", _id });
    },
    edit(id) {
      this.$router.push(`/edit/${id}`);
    },
    async getCurrUser() {
      await this.$store.dispatch({ type: "loadUsers" });
      this.currUser = this.$store.getters.loggedinUser;
    },
    async joinProj() {
      if (this.joinProjStatus === false) return;
      await this.$store.dispatch({
        type: "sendOrder",
        user: this.currUser,
        project: this.displayedProj,
      });
      this.toggleJoinProj();
    },
    toggleJoinProj() {
      this.joinProjStatus = !this.joinProjStatus;
    },
    checkIfUserJoined() {
      var user = this.displayedProj.members.find(member => {
        return member._id === this.currUser._id
      })
      if (user) {
        this.isJoined = true
      }
    },
  },
  async created() {
    await this.getCurrProj(this.$route.params.id);
    await this.getCurrUser();
    this.checkIfUserJoined();
  },
  components: {
    projectReview,
  },
};
</script>
