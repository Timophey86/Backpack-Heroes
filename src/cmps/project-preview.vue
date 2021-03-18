<template>
  <section @click="openDetailsPage(proj._id)" class="project-preview">
    <h1>{{proj.name}}</h1>
    <div class="img-preview">
      <h2>Image Preview</h2>
    </div>
    <div class="rating-preview">
      <h2>{{proj.reviews.rate}}</h2>
    </div>
    <div class="date-preview">
      <h2>{{proj.startsAt}}</h2>
    </div>
    <div class="decs-preview">
      <h2>{{proj.details.description}}</h2>
    </div>
    <div class="previw-img"><img :src="require(`../assets/images/${proj.name}/${proj.imgUrls[0]}`)" alt=""></div>
  </section>
</template>


<script>
export default {
  name: "projectPreview",
    props: ['proj'],
    methods: {
      openDetailsPage(id) {
        this.$router.push(`/project/${id}`)
      }
    }
};
</script>

