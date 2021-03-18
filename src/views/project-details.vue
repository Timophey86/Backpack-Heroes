<template>
  <div v-if="displayedProj" class="project-details-page">
    <div class="proj-details"> 
    <h1>Project Details Page</h1>
    <h2>{{displayedProj.name}}</h2>
    <h3>{{displayedProj.host.fullname}}</h3>
    <p>{{displayedProj.details.description}}</p>
    <button @click="edit(displayedProj._id)">Edit Project Details</button>
    </div>
    <div class="proj reviews">
      <button @click="addReview(displayedProj._id)">Add Review</button>
    </div>
  </div>
</template>


<script>
export default {
  name: "projectDetails",
  computed: {
    displayedProj () {
      return this.$store.getters.projForDetails
    }
  },
  methods: {
    getCurrProj(_id) {
     this.$store.dispatch({type:'getProj', _id})
    },
    edit(id) {
      this.$router.push(`/edit/${id}`)
    },
    addReview(id) {
      console.log(id)
    }
  },
  created() {
    this.getCurrProj(this.$route.params.id)
  }
};
</script>