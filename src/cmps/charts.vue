<script>
import { Pie } from "vue-chartjs";
export default {
  extends: Pie,
  props: ["chartdata"],
  data() {
    return {
      //   chartdata: {
      //     labels: ["January", "February"],
      //     datasets: [
      //       {
      //         label: "Data One",
      //         backgroundColor: "#f87979",
      //         data: "40",
      //       },
      //       {
      //         label: "Data Two",
      //         backgroundColor: "#f87979",
      //         data: "30",
      //       },
      //     ],
      //   },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
// fillData() {
//       this.chartdata = {
//         labels: [
//           "Approved Orders",
//           "My Requests",
//           "My Projects",
//           "Pending Orders",
//         ],
//         datasets: [
//           {
//             backgroundColor: "#f87979",
//             data: [this.userProjectsLength],
//           },
//           {
//             backgroundColor: "#f87979",
//             data: [this.approvedOrdersLength],
//           },
//           {
//             backgroundColor: "#f87979",
//             data: [this.myRequestsLength],
//           },

//           {
//             backgroundColor: "#f87979",
//             data: [this.pendingOrdersLength],
//           },
//         ],
//       };
//     },
</script>
