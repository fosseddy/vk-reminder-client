<script>
const MONTH_START = 0;
const MONTH_END = 11;
const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr",
  "May", "Jun", "Jul", "Aug",
  "Sep", "Oct", "Nov", "Dec"
];

const WEEKDAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const WEEKDAY_COUNT = 7;

const CALENDAR_ROWS = 6;

export default {
  data() {
    return {
      year: 0,
      month: 0,
      calendar: []
    };
  },

  computed: {
    monthName() {
      return MONTH_NAMES[this.month];
    },
    weekdayNames() {
      return WEEKDAY_NAMES;
    }
  },

  created() {
    const d = new Date();
    this.year = d.getFullYear();
    this.month = d.getMonth();
    this.createCalendar();
  },

  methods: {
    changeMonth(direction) {
      this.month += direction;

      if (this.month > MONTH_END) {
        this.month = MONTH_START;
        this.year += 1;
      } else if (this.month < MONTH_START) {
        this.month = MONTH_END;
        this.year -= 1;
      }

      this.createCalendar();
    },

    createCalendar() {
      this.calendar = [];

      const lastMonthDay = new Date(this.year, this.month + 1, 0).getDate();
      const prevLastMonthDay = new Date(this.year, this.month, 0).getDate();
      const firstWeekDay = new Date(this.year, this.month, 1).getDay();

      let row = [];
      let weekDay = 0;
      let monthDay = 1;

      // fill last days of the previous month
      while (weekDay !== firstWeekDay) {
        row[weekDay] = prevLastMonthDay - firstWeekDay + weekDay + 1;
        weekDay += 1;
      }

      for (let _ = 0; _ < CALENDAR_ROWS; _++) {
        while (weekDay < WEEKDAY_COUNT) {
          row[weekDay] = monthDay;
          weekDay += 1;
          monthDay += 1;

          // fill first days of the next month
          if (monthDay > lastMonthDay) {
            monthDay = 1;
          }
        }

        this.calendar.push(row);
        row = [];
        weekDay = 0;
      }
    }
  }
}
</script>

<template>
<div>
  <div class="controls">
    <button @click="changeMonth(-1)">&lt;</button>
    <p>{{ monthName }} {{ year }}</p>
    <button @click="changeMonth(1)">&gt;</button>
  </div>

  <div>
    <table>
      <tr>
        <th style="padding-right: 1rem;" v-for="n in weekdayNames">{{ n }}</th>
      </tr>
      <tr v-for="item in calendar">
        <th v-for="i in item">{{ i }}</th>
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

.row {
  display: flex;
  width: 250px;
  justify-content: space-between;
}

.row div {
  width: 20px;
  text-align: right;
}
</style>
