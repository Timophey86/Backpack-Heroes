<template>
  <section class="select-filter">
    <form action="">
      <el-select v-model="value" placeholder="What field intrests you?">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select v-model="location" placeholder="Where do you want to go?">
        <el-option
          v-for="item in locations"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-date @pickRange="setRange" />
      <el-button
        @click.prevent="
          setCategory(value);
          setLocation(location);
        "
        >Go!</el-button
      >
    </form>
  </section>
</template>

<script>
import elDate from "./elDate.cmp.vue";

export default {
  data() {
    return {
      options: [
        {
          value: " ",
          label: "All",
        },
        {
          value: "Agriculture",
          label: "Agriculture",
        },
        {
          value: "Animals",
          label: "Animals",
        },
        {
          value: "Building",
          label: "Building",
        },
        {
          value: "Education",
          label: "Education",
        },
        {
          value: "Environment",
          label: "Environment",
        },
        {
          value: "Children",
          label: "Children",
        },
      ],
      locations: [
        {
          value: " ",
          label: "All",
        },
        {
          value: "Costa Rica",
          label: "Costa Ricae",
        },
        {
          value: "India",
          label: "India",
        },
        {
          value: "Madagascar",
          label: "Madagascar",
        },
        {
          value: "Nepal",
          label: "Nepal",
        },
        {
          value: "Peru",
          label: "Peru",
        },
        {
          value: "Thailand",
          label: "Thailand",
        },
      ],
      value: "",
      location: "",
      date1: "",
      date2: "",
    };
  },
  methods: {
    setCategory(val) {
      this.$emit("setFilter", {
        category: val,
        location: this.location,
        from: this.date1,
        to: this.date2,
      });
    },
    setLocation(val) {
      this.$emit("setFilter", {
        location: val,
        category: this.value,
        from: this.date1,
        to: this.date2,
      });
    },
    setRange(val) {
      this.date1 = Date.parse(val[0]);
      this.date2 = Date.parse(val[1]);
    },
    setDates() {
      this.$emit("setFilter", {
        category: this.value,
        location: this.location,
        from: this.date1,
        to: this.date2,
      });
    },
  },
  components: {
    elDate,
  },
};
</script>