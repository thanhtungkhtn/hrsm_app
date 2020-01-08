<script>
import { Bar } from "vue-chartjs";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";

export default {
  extends: Bar,
  props: ["height", "data4"],
  mounted() {
    const datasets4 = [
      {
        label: "Number of authorized employees in the application",
        backgroundColor: "rgba(255,255,255)",
        borderColor: "transparent",
        data: this.data4 // [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98]
      }
    ];
    this.renderChart(
      {
        labels: ["Full", "Admin", "Create", "Edit", "Only View", "Powerless"],
        datasets: datasets4
      },
      {
        tooltips: {
          enabled: false,
          custom: CustomTooltips
        },
        maintainAspectRatio: false,
        legend: {
          display: true
        },
        scales: {
          xAxes: [
            {
              display: true,
              categoryPercentage: 1,
              barPercentage: 0.5
            }
          ],
          yAxes: [
            {
              display: true
            }
          ]
        }
      }
    );
  }
};
</script>
