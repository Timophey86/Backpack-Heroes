<template>
  <section class="user-preview">
    <div v-if="previewedUser" class="user-preview-content">
        <el-image :src="showImg" fit="cover"></el-image>
        <!-- {{previewedUser.imgUrl}} -->
        <div class="name-and-btn">    <h2>{{previewedUser.fullname}}</h2>   <el-button
          class="close-modal"
          size="mini"
          icon="el-icon-close"
          @click.prevent="closeModal"
        /></div>
        <p>{{previewedUser.about}}</p>
        <h5>My email: {{previewedUser.email}}</h5>
    </div>
  </section>
</template>

<script>
export default {
  name: "userPreview",
  props: ["userId"],
  data() {
    return {
      previewedUser: null,
    };
  },
  computed: {
    showImg() {
    if (!this.previewedUser.imgUrl.includes("http://res.cloudinary.com/")) {
        return require("@/assets/images/avatars/" + this.previewedUser.imgUrl);
      }
      return this.previewedUser.imgUrl;
    },
  },
  methods: {
    async getUser(id) {
      await this.$store.dispatch({ type: "getUser", userId: id });
      this.previewedUser= this.$store.getters.viewedUser
    },
    closeModal() {
        this.$emit('onCloseModal')
        this.$store.commit('removeViewedUser')
    }
  },
  created() {
      this.getUser(this.userId)
  },
};
</script>
