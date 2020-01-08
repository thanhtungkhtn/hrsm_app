<script>
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  props: ["data"],
  mounted() {
    this.renderChart(
      {
        labels: ["Male", "Female"],
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651"],
            data: this.data
          }
        ]
      },
      { responsive: true, maintainAspectRatio: true }
    );
  }
};
</script>
