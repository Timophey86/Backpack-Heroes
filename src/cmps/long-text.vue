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
  props: ["txt","length"],
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
      if (this.txt.length > this.length) {
        this.isLongTxt = true;
        if (!this.isShowMore) {
          return this.txt.substring(0, this.length) + "...";
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
