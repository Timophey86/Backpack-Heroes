<template>
  <section class="select-filter">
    <div class="category-select">
      <el-select v-model="category" placeholder="What field intrests you?">
        <el-option
          v-for="item in categoryOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select v-model="location" placeholder="Where do you want to go?">
        <el-option
          v-for="item in locationOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <div class="date-select">
      <el-date-picker
        @change="setRange"
        v-model="fromTodates"
        type="daterange"
        range-separator="-"
        start-placeholder="Start date"
        end-placeholder="End date"
      >
      </el-date-picker>
      <el-button @click.prevent="goSearch">Go!</el-button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      categoryOptions: [
        {
          value: "",
          label: "What field intrests you?",
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
      locationOptions: [
        {
          value: "",
          label: "Where do you want to go?",
        },
        {
          value: "Costa Rica",
          label: "Costa Rica",
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
      fromTodates: [],
      category: "",
      location: "",
      dateFrom: "",
      dateTo: "",
    };
  },
  methods: {
    async goSearch() {
      await this.$emit("setFilter", {
        category: this.category,
        location: this.location,
        from: this.dateFrom,
        to: this.dateTo,
      });
    },
    setRange() {
      // this.dateFrom = this.fromTodates[0];
      this.dateFrom = Date.parse(this.fromTodates[0]);
      // console.log("from", this.dateFrom);
      // this.dateTo = this.fromTodates[1];
      this.dateTo = Date.parse(this.fromTodates[1]);
      // console.log("to", this.dateTo);
    },
  },
};
</script>
