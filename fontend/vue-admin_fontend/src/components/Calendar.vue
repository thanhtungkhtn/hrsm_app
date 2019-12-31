<template>
  <div class="hello">
    <FunctionalCalendar
      v-model="calendarData"
      :configs="calendarConfigs"
    ></FunctionalCalendar>
  </div>
</template>

<script>
import { FunctionalCalendar } from 'vue-functional-calendar';

export default {
    components: {
        FunctionalCalendar
    },
    data() {
        return {
            calendarData: {},
            calendarConfigs: {
                dateFormat: 'dd/mm/yyyy',
                isDatePicker: true,
                isMultiple: true,
                calendarsCount: 3,
            }
        }
    }
}
</script>
