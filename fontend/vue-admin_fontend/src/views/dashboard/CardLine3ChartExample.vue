<script>
import { Line } from 'vue-chartjs'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'

export default {
  extends: Line,
  props: ['height', 'width', 'data3' ],
  mounted () {
    const datasets3 = [
      {
        label: 'Number of employees at this level',
        backgroundColor: 'rgba(255,255,255,.2)',
        borderColor: 'rgba(255,255,255,.55)',
        data: this.data3 //[78, 81, 80, 45, 34, 12, 40]
      }
    ]
    this.renderChart(
      {
        labels: ['Cao Đẳng', 'Đại Học', 'Trung Cấp', 'Thạc Sĩ', 'Tiến Sĩ'],
        datasets: datasets3
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
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }]
        },
        elements: {
          line: {
            borderWidth: 2
          },
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4
          }
        }
      }
    )
  }
}
</script>
