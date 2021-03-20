<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column v-for="member in tableData" :key="member._id" prop="member.fullName" label="Applicants Name" width="180"> </el-table-column>
    <el-table-column prop="name" label="Projects Name" width="180"> </el-table-column>
    <el-table-column prop="address" label="Status"> </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ["orders"],
  data() {
    return {
      tableData: this.orders
  }
  },
  created() {
      this.tableData = this.orders
      console.log( this.tableData)
  }
};
</script>