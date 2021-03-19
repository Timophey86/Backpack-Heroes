<template>
  <div v-if="displayedProj" class="project-details-page main-container">
    <div class="details-img-container">
      <div
        :class="displayedProj.name + '-' + img"
        v-for="(img, index) in displayedProj.imgUrls"
        :key="index"
        :style="{
          background: `url(${require(`../assets/images/${displayedProj.name}/${img}.jpg`)})`,backgroundSize: 'cover',backgroundPosition: 'center',}"
      >
        <!-- <img :src="require(`../assets/images/${displayedProj.name}/${img}.jpg`)"  alt=""/> -->
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
        <!-- <div class="amneties">
        <div class="detail-headers">Amneties for the volunteer:</div>
        <ul>
          <li v-for="(amenities, index) in displayedProj.details.amenities" :key="index">
            {{amenities}}
          </li>
        </ul>
      </div> -->
        <button @click="edit(displayedProj._id)">Edit Project Details</button>
      <div class="proj reviews">
        <button @click="addReview(displayedProj._id)">Add Review</button>
      </div>
      </div>
      <div class="members-div">
        <h2>Members who decided to join us:</h2>
        <ul class="member-list">
          <li v-for="(members, index) in displayedProj.members" :key="index">
            {{members.fullname}}
          </li>
        </ul>
        <p class="amneties">As a member these are some of the bonuses we provide for the members of our program:
            <ul>
          <li v-for="(amenities, index) in displayedProj.details.amenities" :key="index">
            {{amenities}}
          </li>
        </ul>
        </p>
        <button>Join Us!</button>
    </div>
  </div>
      <div class="proj-reviews">
        <label>Your full name:</label>
        <input type="text" v-model="reviewToEdit.fullname" />
        <label>Rate:</label>
        <input type="number" v-model="reviewToEdit.rate" min="0" max="5" />
        <textarea
          placeholder="Your Opinion Matters..."
          v-model="reviewToEdit.txt"
        ></textarea>
        {{ displayedProj.reviews }}
        <button @click="addReview()">Add Review</button>
      </div>
  </div>
</template>

<script>
export default {
  name: "projectDetails",
  data() {
    return {
      reviewToEdit: {
        txt: "",
        rate: 5,
        fullname: "",
      },
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
      return new Date(this.displayedProj.startsEnd).toDateString();
    },
  },
  methods: {
    getCurrProj(_id) {
      this.$store.dispatch({ type: "getProj", _id });
    },
    edit(id) {
      this.$router.push(`/edit/${id}`);
    },
    async addReview() {
      const reviewCopy = JSON.parse(JSON.stringify(this.reviewToEdit));
      this.displayedProj.reviews.push(reviewCopy);

      await this.$store.dispatch({ type: "saveProj", project: this.displayedProj });
    },
  },
  created() {
    this.getCurrProj(this.$route.params.id);
  },
};
</script>
