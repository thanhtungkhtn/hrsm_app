<script>
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  props: ["data"],
  mounted() {
    this.renderChart(
      {
        labels: ["Full", "Admin", "Create", "Edit", "Only View", "Powerless"],
        datasets: [
          {
            backgroundColor: [
              "#41B883",
              "#E46651",
              "#00D8FF",
              "#DD1B16",
              "#33CC00",
              "#006666"
            ],
            data: this.data
          }
        ]
      },
      { responsive: true, maintainAspectRatio: true }
    );
  }
};
</script>
