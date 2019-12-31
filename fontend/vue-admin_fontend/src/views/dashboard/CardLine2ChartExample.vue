<script>
import { Line } from 'vue-chartjs'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities'

export default {
  extends: Line,
  props: ['height', 'width', 'data2'],
  mounted () {
    const brandInfo = getStyle('--light-green') || '#99CC33'
    const datasets2 = [
      {
        label: 'Number of employees at this position',
        backgroundColor: brandInfo,
        borderColor: 'rgba(255,255,255,.55)',
        data:  this.data2 //[5, 5, 5, 5, 5, 5, 5]
      }
    ]

    this.renderChart(
      {
        labels: [
          'Nhân Viên',
          'Tổ Trưởng',
          'Phó Phòng',
          'Trưởng Phòng',
          'Giám Đốc',
          'Phó Giám Đốc'
          ],
        datasets: datasets2
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
              gridLines: {
                color: 'transparent',
                zeroLineColor: 'transparent'
              },
              ticks: {
                fontSize: 2,
                fontColor: 'transparent'
              }
            }
          ],
          yAxes: [
            {
              display: true,
              ticks: {
                display: true,
                min: Math.min.apply(Math, datasets2[0].data) - 5,
                max: Math.max.apply(Math, datasets2[0].data) + 5
              }
            }
          ]
        },
        elements: {
          line: {
            tension: 0.00001,
            borderWidth: 1
          },
          point: {
            radius: 4,
            hitRadius: 10,
            hoverRadius: 4
          }
        }
      }
    )
  }
}
</script>
