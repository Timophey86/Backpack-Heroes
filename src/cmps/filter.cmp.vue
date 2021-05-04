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
  props: ["homePageCategory", "homePageLocation"],
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
        {
          value: "Medical Care",
          label: "Medical Care",
        },
        {
          value: "Women's Empowerment",
          label: "Women's Empowerment",
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
        {
          value: "South Africa",
          label: "South Africa",
        },
        {
          value: "Tanzania",
          label: "Tanzania",
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
    goSearch() {
      this.$emit("setListFilter", {
        category: this.category,
        location: this.location,
        from: this.dateFrom,
        to: this.dateTo,
      });
      this.$emit("displayShowAllBtn");
    },
    setRange() {
      this.dateFrom = Date.parse(this.fromTodates[0]);
      this.dateTo = Date.parse(this.fromTodates[1]);
    },
    resetFilterVals() {
      (this.fromTodates = []),
        (this.category = ""),
        (this.location = ""),
        (this.dateFrom = ""),
        (this.dateTo = "");
    },
  },
  created() {
    if (this.homePageCategory) {
      this.category = this.homePageCategory;
      this.goSearch();
    }
    if (this.homePageLocation) {
      this.location = this.homePageLocation;
      this.goSearch();
    }
  },
};
</script>
