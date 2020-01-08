<script>
import { Bar } from "vue-chartjs";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";

export default {
  extends: Bar,
  props: ["data"],
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(
      {
        labels: [
          "Phòng Nhân Sự",
          "Phòng Kế Toán",
          "Phòng Kinh Doanh",
          "Phòng Kỹ Thuật",
          "Phòng Giám Đốc",
          "Phòng Phó Giám Đốc"
        ],
        datasets: [
          {
            label: "Số Nhân viên",
            backgroundColor: "#f87979",
            data: this.data
          }
          // {
          //   label: "Commits",
          //   backgroundColor: "#f87979",
          //   data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
          // }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: true,
        tooltips: {
          enabled: false,
          custom: CustomTooltips,
          intersect: true,
          mode: "index",
          position: "nearest",
          callbacks: {
            labelColor: function(tooltipItem, chart) {
              return {
                backgroundColor:
                  chart.data.datasets[tooltipItem.datasetIndex].backgroundColor
              };
            }
          }
        }
      }
    );
  }
};
</script>
