<template>
  <div class="bg-white border rounded-custom shadow">
    <div class="flex mb-2 px-5 pt-4 pb-2">
      <h2 class="w-2/3 font-semibold text-blue">Total</h2>
      <p class="w-1/3 font-semibold text-sm text-right">
        {{ currentMonth }} {{ currentYear }}
      </p>
    </div>
    <hr />
    <div class="flex mb-0 p-1 pb-0">
      <span class="w-1/2 flex justify-center px-7 pt-4">
        <CircleProgressBar
          :text1="`${monthlyHours}/${monthlyTotalHours}`"
          text2="working hours"
          :text3="currentMonth"
          :maxValue="173"
          :value="monthlyHours"
          color="#52bc41"
        />
      </span>
      <span class="w-1/2 flex justify-center px-7 pt-4">
        <CircleProgressBar
          :text1="`${weeklyHours}/${weeklyTotalHours}`"
          text2="working hours"
          :text3="`Week ${currentWeekAndDay}`"
          :maxValue="40"
          :value="weeklyHours"
          color="var(--text-blue-400)"
        />
      </span>
    </div>
    <hr />
    <div class="flex mb-2 px-5 pt-3 pb-1">
      <button
        class="w-2/3 font-semibold text-left text-blue"
        @click="handleInitialSalaryClick"
      >
        Initial salary
        <div
          class="relative inline-block w-2 text-center cursor-pointer ml-1.5 group"
        >
          <i class="fas fa-question-circle text-lg text-blue"></i>
          <div
            class="opacity-0 w-28 bg-blue text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full left-1/2 transform -translate-x-1/2 pointer-events-none shadow-xl"
          >
            <h2 class="font-semibold">Title</h2>
            <p>Lorem ipsum...</p>
            <svg
              class="absolute h-2 w-full left-0 top-full"
              viewBox="0 0 255 255"
              xml:space="preserve"
            >
              <polygon
                class="fill-current text-blue"
                points="0,0 127.5,127.5 255,0"
              />
            </svg>
          </div>
        </div>
      </button>
      <button
        class="w-1/3 font-semibold text-right text-blue"
        @click="handleShowSalaryClick"
      >
        Show Salary
        <i class="fas fa-eye ml-1.5"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { getCurrentDateInfo } from "../dateUtils.js";
import CircleProgressBar from "./CircleProgressBar.vue";

export default defineComponent({
  props: {
    monthlyHours: {
      type: Number,
      required: true,
    },
    monthlyTotalHours: {
      type: Number,
      required: true,
    },
    weeklyHours: {
      type: Number,
      required: true,
    },
    weeklyTotalHours: {
      type: Number,
      required: true,
    },
  },
  created() {
    const { year, month, weekAndDay } = getCurrentDateInfo();
    this.currentYear = year;
    this.currentMonth = month;
    this.currentWeekAndDay = weekAndDay;
  },
  components: {
    CircleProgressBar,
  },
  setup(props, { emit }) {
    const handleInitialSalaryClick = () => {
      emit("initialSalary-click");
    };
    const handleShowSalaryClick = () => {
      emit("showSalary-click");
    };

    return {
      handleInitialSalaryClick,
      handleShowSalaryClick,
    };
  },
});
</script>
