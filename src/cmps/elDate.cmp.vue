<template>
  <section>
 <div class="block">
    <el-date-picker @change="setRange"
      v-model="value1"
      type="daterange"
      range-separator="To"
      start-placeholder="Start date"
      end-placeholder="End date">
    </el-date-picker>
  </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      value1: "",
    };
  },
  methods: {
      setRange() {
          this.$emit("pickRange", this.value1)
      }
  }
};
</script>