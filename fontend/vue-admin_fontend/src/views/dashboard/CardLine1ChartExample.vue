<script>
import { Line } from "vue-chartjs";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";
export default {
  extends: Line,
  props: ["height", "width", "data1", "listLabel1"],
  mounted() {
    const brandPrimary = getStyle("--info") || "#20a8d8";
    const datasets1 = [
      {
        label: "Total number of employees",
        backgroundColor: brandPrimary,
        borderColor: "rgba(255,255,255)",
        data: this.data1
      }
    ];

    this.renderChart(
      {
        labels: [
          "Phòng Nhân Sự",
          "Phòng Kế Toán",
          "Phòng Kinh Doanh",
          "Phòng Kĩ Thuật",
          "Phòng Giám Đốc",
          "Phòng Phó Giám Đốc"
        ],
        datasets: datasets1
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
              gridLines: {
                color: "transparent",
                zeroLineColor: "transparent"
              },
              ticks: {
                fontSize: 2,
                fontColor: "transparent"
              }
            }
          ],
          yAxes: [
            {
              display: true,
              ticks: {
                display: true,
                min: Math.min.apply(Math, datasets1[0].data) - 5,
                max: Math.max.apply(Math, datasets1[0].data) + 5
              }
            }
          ]
        },
        elements: {
          line: {
            borderWidth: 1
          },
          point: {
            radius: 4,
            hitRadius: 10,
            hoverRadius: 4
          }
        }
      }
    );
  }
};
</script>
