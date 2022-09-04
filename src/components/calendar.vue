<script>
const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr",
  "May", "Jun", "Jul", "Aug",
  "Sep", "Oct", "Nov", "Dec"
];

const WEEKDAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const WEEKDAY_COUNT = 7;

const CALENDAR_ROWS = 6;

function areDatesEqual(d1, d2) {
  return d1.getDate() === d2.getDate() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getFullYear() === d2.getFullYear();
}

export default {
  props: ["selected"],
  emits: ["change"],

  data() {
    return {
      date: null,
      today: null,
      calendar: []
    };
  },

  computed: {
    monthName() {
      return MONTH_NAMES[this.date.getMonth()];
    },
    weekdayNames() {
      return WEEKDAY_NAMES;
    }
  },

  created() {
    this.date = new Date();
    this.today = new Date();
    this.createCalendar();
  },

  methods: {
    changeMonth(direction) {
      this.date.setMonth(this.date.getMonth() + direction);
      this.date = new Date(this.date);
      this.createCalendar();
    },

    changeSelected(date) {
      this.$emit("change", new Date(date));
      if (date.getMonth() !== this.date.getMonth()) {
        this.date = new Date(date);
        this.createCalendar();
      }
    },

    isActive(date) {
      return this.date.getMonth() === date.getMonth();
    },

    isToday(date) {
      return areDatesEqual(this.today, date);
    },

    isSelected(date) {
      return areDatesEqual(this.selected, date);
    },

    createCalendar() {
      const result = [];

      let row = [];
      let monthDay = 1;
      let weekDay = 0;

      // fill last days of the previous month
      const firstWeekDay = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        1
      );
      let offset = firstWeekDay.getDay();
      while (weekDay !== firstWeekDay.getDay()) {
        const d = new Date(firstWeekDay);
        d.setDate(d.getDate() - offset);
        row[weekDay] = d;
        weekDay += 1;
        offset -= 1;
      }

      // fill days of the current month and first days of the next month
      for (let _ = 0; _ < CALENDAR_ROWS; _++) {
        while (weekDay < WEEKDAY_COUNT) {
          const d = new Date(this.date);
          d.setDate(monthDay);
          row[weekDay] = d;
          weekDay += 1;
          monthDay += 1;
        }

        result.push(row);
        row = [];
        weekDay = 0;
      }

      this.calendar = result;
    }
  }
}
</script>

<template>
<div>
  <div class="controls">
    <button @click="changeMonth(-1)">&lt;</button>
    <p>{{ monthName }} {{ date.getFullYear() }}</p>
    <button @click="changeMonth(1)">&gt;</button>
  </div>

  <div>
    <table>
      <tr>
        <th style="padding-right: 1rem;" v-for="n in weekdayNames">{{ n }}</th>
      </tr>
      <tr v-for="row in calendar">
        <td v-for="date in row"
            @click="changeSelected(date)"
            :class="{
              active: isActive(date),
              today: isToday(date),
              selected: isSelected(date)
            }"
        >
          {{ date.getDate() }}
        </td>
      </tr>
    </table>
  </div>
</div>
</template>

<style scoped>
.controls {
  display: flex;
  align-items: center;
}

.controls p {
  margin: 0 1rem;
}

.controls button {
  padding: .3rem 1rem;
}

td, th {
  color: lightgray;
}

td.active {
  color: black;
}

td.today {
  color: blue;
}

td.selected {
  color: red;
}
</style>
