<template>
  <section class="project-preview">
    <div class="project-details">
      <h1>{{ proj.name }}</h1>
      <div class="rating-preview">
        <h2>{{ proj.reviews.rate }}</h2>
      </div>
      <div class="location-preview">
        <h4>{{ proj.loc.country }}</h4>
      </div>
      <div class="date-preview">
        <div class="detail-headers">Duration of program:</div>
        <span>{{ formatDateFrom }}</span> to <span>{{ formatDateTo }}</span>
      </div>
      <div>
        <div class="detail-headers">Volunteer Fields:</div>
        <ul>
          <li v-for="(tags, index) in proj.tags" :key="index">
            {{ tags }}
          </li>
        </ul>
      </div>
      <div class="decs-preview">
        <p>{{ proj.details.description }}</p>
        <button @click="openDetailsPage(proj._id)" class="continue-reading">
          Discover More..
        </button>
      </div>
    </div>
    <div class="previw-img">
      <img
        :src="
          require(`../assets/images/${proj.name}/${proj.imgUrls[2]}` + '.jpg')
        "
        alt=""
      />
    </div>
  </section>
</template>

<script>
export default {
  name: "projectPreview",
  props: ["proj"],
  computed: {
    formatDateFrom() {
      return new Date(this.proj.startsAt).toDateString();
    },
    formatDateTo() {
      return new Date(this.proj.startsEnd).toDateString();
    },
  },
  methods: {
    openDetailsPage(id) {
      this.$router.push(`/project/${id}`);
    },
  },
};
</script>
