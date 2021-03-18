<template>
  <div v-if="displayedProj" class="project-details-page main-container">
    <div class="details-img-container">
      <ul>
        <li :class="displayedProj.name+'-'+img" v-for="(img, index) in displayedProj.imgUrls" :key="index">
          <img :src="require(`../assets/images/${displayedProj.name}/${img}.jpg`)" alt=""/>
        </li>
      </ul>
    </div>
    <div class="proj-details"> 
      <div>
    <h2>{{displayedProj.name}}</h2>
    <h3>{{displayedProj.host.fullname}}</h3>
       <div class="amneties">
        <div class="detail-headers">Amneties for the volunteer:</div>
        <ul>
          <li v-for="(amenities, index) in displayedProj.details.amenities" :key="index">
            {{amenities}}
          </li>
        </ul>
      </div>
    <p>{{displayedProj.details.description}}</p>
    <button @click="edit(displayedProj._id)">Edit Project Details</button>
    </div>
    <div class="proj reviews">
      <button @click="addReview(displayedProj._id)">Add Review</button>
    </div>
  </div>
  </div>
</template>


<script>
export default {
  name: "projectDetails",
  computed: {
    displayedProj() {
      return this.$store.getters.projForDetails;
    },
  },
  methods: {
    getCurrProj(_id) {
      this.$store.dispatch({ type: "getProj", _id });
    },
    edit(id) {
      this.$router.push(`/edit/${id}`);
    },
    addReview(id) {
      this.$store.dispatch({ type: "addReview", id });
    },
  },
  created() {
    this.getCurrProj(this.$route.params.id);
  },
};
</script>