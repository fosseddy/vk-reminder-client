<script>
const MONTH_NAMES = [
    "January", "Febuary", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];

const WEEKDAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const WEEKDAY_COUNT = 7;

const CALENDAR_ROWS = 6;

const HOURS = [
    "00", "01", "02", "03", "04", "05",
    "06", "07", "08", "09", "10", "11",
    "12", "13", "14", "15", "16", "17",
    "18", "19", "20", "21", "22", "23"
];

const MINUTES = [
    "00", "05", "10",
    "15", "20", "25",
    "30", "35", "40",
    "45", "50", "55"
];

function areDatesEqual(d1, d2) {
    return d1.getDate() === d2.getDate() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getFullYear() === d2.getFullYear();
}

function format(time) {
    return String(time).padStart(2, "0");
}

export default {
    props: ["selected"],
    emits: ["change"],

    data() {
        return {
            date: null,
            today: null,
            calendar: [],
            hs: null,
            ms: null
        };
    },

    computed: {
        monthName() {
            return MONTH_NAMES[this.date.getMonth()];
        },
        weekdayNames() {
            return WEEKDAY_NAMES;
        },
        hours() {
            return HOURS;
        },
        minutes() {
            return MINUTES;
        },
        hour() {
            return format(this.selected.getHours());
        },
        minute() {
            const min = this.selected.getMinutes();
            if (min >= 55) return "00";
            const roundTo = 5;
            const mod = min % roundTo;
            return format(min + (roundTo - mod));
        }
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

        changeHours(h) {
            this.selected.setHours(h);
            this.$emit("change", new Date(this.selected));
        },

        changeMinutes(m) {
            this.selected.setMinutes(m);
            this.$emit("change", new Date(this.selected));
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
    },

    created() {
        this.date = new Date();
        this.today = new Date();
        this.createCalendar();
    }
}
</script>

<template>
    <div class="dt-picker">
        <div class="controls">
            <button type="button" class="controls__btn" @click="changeMonth(-1)">&lt;</button>
            <p class="controls__text">{{ monthName }} {{ date.getFullYear() }}</p>
            <button type="button" class="controls__btn" @click="changeMonth(1)">&gt;</button>
        </div>

        <table class="dt-calendar">
            <tr class="dt-calendar__row">
                <th v-for="n in weekdayNames">{{ n }}</th>
            </tr>
            <tr class="dt-calendar__row" v-for="row in calendar">
                <td v-for="date in row"
                    :class="{ active: isActive(date), today: isToday(date), selected: isSelected(date) }"
                >
                    <button type="button" @click="changeSelected(date)">
                        {{ date.getDate() }}
                    </button>
                </td>
            </tr>
        </table>

        <select @change="changeHours($event.target.value)">
            <option v-for="h in hours" :key="h">{{h}}</option>
        </select>
        <select @change="changeMinutes($event.target.value)">
            <option v-for="m in minutes" :key="m">{{m}}</option>
        </select>
    </div>
</template>

<style scoped>
.dt-picker {
    border:1px solid black;
    max-width: 300px;
    border-radius: 10px;
    padding: 1rem;
}

.dt-picker button {
    cursor: pointer;
    background: none;
    border: none;
    border-radius: 5px;
    padding: 5px 8px;
    color: inherit;
}

.controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.controls__btn {
    font-weight: bold;
    box-shadow: 0px 2px 5px darkgray;
}

.controls__btn:hover {
    opacity: .7;
}

.controls__text {
    font-weight: bold;
    font-size: .9rem;
}

.dt-calendar {
    width: 100%;
    text-align: center;
}

.dt-calendar__row {
    color: lightgray;
}

.active {
    color: black;
}

.today {
    color: blue;
}

.selected {
    color: red;
}
</style>
