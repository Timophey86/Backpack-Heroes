<template>
  <section class="proj-description">
    <p>
      {{ txtDisplay }}
    </p>
    <button v-if="isLongTxt" @click="toggleShow" class="show-more-btn">
      {{ btnTxt }}
    </button>
  </section>
</template>

<script>
export default {
  props: ["txt"],
  data() {
    return {
      isLongTxt: false,
      isShowMore: false,
    };
  },
  methods: {
    toggleShow() {
      this.isShowMore = !this.isShowMore;
    },
  },
  computed: {
    txtDisplay() {
      if (this.txt.length > 50) {
        this.isLongTxt = true;
        if (!this.isShowMore) {
          return this.txt.substring(0, 50) + "...";
        }
        return this.txt;
      }
      return this.txt;
    },
    btnTxt() {
      return this.isShowMore ? "Show less" : "Show more";
    },
  },
};
</script>
