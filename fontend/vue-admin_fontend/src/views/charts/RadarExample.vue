<script>
import { Radar } from "vue-chartjs";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";

export default {
  extends: Radar,
  props: ["data"],
  mounted() {
    this.renderChart(
      {
        labels: [
          "Nhân Viên",
          "Tổ Trưởng",
          "Phó Phòng",
          "Trưởng Phòng",
          "Giám Đốc",
          "Phó Giám Đốc"
        ],
        datasets: [
          {
            label: "2019",
            backgroundColor: "rgba(179,181,198,0.2)",
            borderColor: "rgba(179,181,198,1)",
            pointBackgroundColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
            data: this.data //[65, 59, 90, 81, 56, 55, 40]
          }
          // {
          //   label: '2018',
          //   backgroundColor: 'rgba(255,99,132,0.2)',
          //   borderColor: 'rgba(255,99,132,1)',
          //   pointBackgroundColor: 'rgba(255,99,132,1)',
          //   pointBorderColor: '#fff',
          //   pointHoverBackgroundColor: '#fff',
          //   pointHoverBorderColor: 'rgba(255,99,132,1)',
          //   data: [28, 48, 40, 19, 96, 27, 100]
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
                  chart.data.datasets[tooltipItem.datasetIndex].borderColor
              };
            }
          }
        }
      }
    );
  }
};
</script>
