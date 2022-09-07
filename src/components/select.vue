<script>
export default {
  props: ["value", "options"],
  emits: ["value-change"],

  data() {
    return {
      open: false
    };
  },

  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },

  destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  },

  methods: {
    changeValue(v) {
      this.$emit("value-change", v);
      this.open = false;
    },

    toggleOptions() {
      this.open = !this.open;
      if (this.open) {
        const opts = this.$refs["select"]
          .querySelector(`.select__option--${this.value}`);

        opts.scrollIntoView();
      }
    },

    handleClickOutside(e) {
      if (open) {
        if (!this.$refs["select"].contains(e.target)) {
          this.open = false;
        }
      }
    }
  }
};
</script>

<template>
<div class="select" ref="select">
  <div class="select__value" @click="toggleOptions()">
    <div>{{ value }} <span>{{ open ? "&uarr;" : "&darr;" }}</span></div>
  </div>

  <div class="select__options" :class="{ 'select__options--open': open }">
    <div v-for="opt in options"
         @click="changeValue(opt)"
         class="select__option"
         :class="'select__option--'+opt"
    >
      {{ opt }}
    </div>
  </div>
</div>
</template>

<style scoped>
.select {
  position: relative;
  max-width: fit-content;
}

.select__value {
  cursor: pointer;
  padding: 1rem;
}

.select__value:hover {
  background-color: lightgray;
}

.select__options {
  position: absolute;
  left: 0;
  right: 0;
  height: 200px;
  overflow-y: scroll;
  border: 1px solid black;
  background-color: white;
  visibility: hidden;
  z-index: 1;
}

.select__options--open {
  visibility: visible;
}

.select__option {
  cursor: pointer;
  padding: 1rem;
}

.select__option:hover {
  background-color: lightgray;
}
</style>
