<template>
  <div class="hello">
    <h2>Vue Calendar</h2>
    <vue-calendar
      :show-limit="3"
      :events="events"
      :disable="disabledDays"
      :highlight="highlightDays"

      @show-all="showAll"
      @day-clicked="dayClicked"
      @event-clicked="eventClicked"
      @month-changed="monthChanged"
  ></vue-calendar>
  </div>
</template>

<script>
import "../assets/vue2-simple-calendar.css";

export default {
  name: "Calendar",
  data() {
    return {
      data: []
    };
  },
  methods: {
    showAll(events) {
      // Do something...
    },
    dayClicked(day) {
      console.log(day);
      // Do something...
    },
    eventClicked(event) {
      // Do something...
    },
    monthChanged(start, end) {
      // Do something...
    }
  },
  created() {
    this.$calendar.eventBus.$on('show-all', events => showAll(events));
    this.$calendar.eventBus.$on('day-clicked', day =>  dayClicked(day));
    this.$calendar.eventBus.$on('event-clicked', event => eventClicked(event));
    this.$calendar.eventBus.$on('month-changed', (start, end) => monthChanged(start, end));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
