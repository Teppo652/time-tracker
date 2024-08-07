<template>
  <div class="flex flex-nowrap mb-1">
    <!-- left column -->
    <!-- user is checkedIn -->
    <router-link
      to="/time-tracking"
      v-if="lastCheckIn && !lastCheckOut"
      class="flex flex-nowrap w-2/3 w-full cursor-pointer mr-4 border rounded-custom shadow bg-light-green mb-4 relative overflow-hidden transition-transform transform hover:scale-95 hover:shadow-lg"
      style="borderradius: 2.05rem"
      @click="handleChangeStatusClick"
    >
      <!-- clock icon -->
      <div class="absolute top-6 right-0 mt-[17px] mr-[-17px] z-0">
        <i class="fa-regular fa-clock text-8xl text-dark-green"></i>
      </div>
      <div class="relative text-left px-4 py-4 z-10">
        <p class="font-bold text-white py-1">Working since</p>
        <p class="text-3xl text-white font-semibold">
          {{ getFormattedTime(lastCheckIn, "time24") }}
        </p>
        <p class="text-sm text-white">
          {{ getFormattedTime(lastCheckIn, "dd") }}
          {{ getFormattedTime(lastCheckIn, "mmm") }}
          {{ getFormattedTime(lastCheckIn, "yyyy") }}
        </p>
      </div>
    </router-link>
    <router-link
      to="/time-tracking"
      v-else
      class="flex flex-nowrap bg-gray-50 w-2/3 w-full cursor-pointer mr-4 border inner-border-white rounded-custom shadow mb-4 relative overflow-hidden transition-transform transform hover:scale-95 hover:shadow-lg"
      @click="handleChangeStatusClick"
    >
      <!-- clock icon -->
      <div class="absolute top-0 right-0 mt-[17px] mr-[-13px] z-0">
        <i class="fa-regular fa-clock text-8xl text-light-gray"></i>
      </div>
      <div class="relative text-left px-4 py-4 text-dark-gray z-10">
        <p class="font-bold">Not checked in</p>
        <p class="text-xs font-semibold">Latest Check in</p>
        <p v-if="lastCheckIn" class="text-sm text-dark-gray">
          {{ getFormattedTime(lastCheckIn, "dd") }}
          {{ getFormattedTime(lastCheckIn, "mmm") }}
          from
          {{ getFormattedTime(lastCheckIn, "time24") }}
          to
          {{ getFormattedTime(lastCheckOut, "time24") }}
        </p>
        <p v-else class="text-sm text-dark-gray">Never</p>
      </div>
    </router-link>
    <!-- right column -->
    <button
      v-if="userHasDaypass"
      class="flex flex-nowrap w-1/3 w-full cursor-pointer border border-white rounded-custom shadow bg-light-green mb-4 relative overflow-hidden transition-transform transform hover:scale-95 hover:shadow-lg"
      @click="handleDayPassClick"
    >
      <!-- calendar icon -->
      <div class="absolute top-0 right-1 mt-[27px] z-0">
        <i
          class="fa-solid fa-calendar-days text-dark-green"
          style="font-size: 4.7rem"
        ></i>
      </div>
      <div class="relative text-left p-4 z-10">
        <p class="font-bold text-white">Day Pass</p>
        <p class="text-sm text-white">Is active</p>
      </div>
    </button>

    <button
      v-else
      class="flex flex-nowrap bg-gray-50 w-1/3 w-full cursor-pointer border border-white rounded-custom shadow mb-4 relative overflow-hidden transition-transform transform hover:scale-95 hover:shadow-lg"
      @click="handleDayPassClick"
    >
      <!-- calendar icon -->
      <div class="absolute top-0 right-1 mt-[27px] z-0">
        <i
          class="fa-solid fa-calendar-days text-light-gray"
          style="font-size: 4.7rem"
        ></i>
      </div>
      <div class="relative text-left p-4 z-10">
        <p class="font-bold text-dark-gray">Day Pass</p>
        <p class="text-sm text-dark-gray">No pass</p>
      </div>
    </button>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { getFormattedTime } from "../dateUtils.js";

export default defineComponent({
  data() {
    return {
      getFormattedTime,
    };
  },
  props: {
    lastCheckIn: {
      type: Date,
    },
    lastCheckOut: {
      type: Date,
    },
    userIsCheckedIn: {
      type: Boolean,
    },
    userHasDaypass: {
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const currStatus =
      props.lastCheckIn && !props.lastCheckOut ? "isCheckedIn" : "notCheckedIn";

    const handleChangeStatusClick = () => {
      emit("changeStatus-click");
    };
    const handleDayPassClick = () => {
      emit("dayPass-click");
    };

    return {
      handleChangeStatusClick,
      handleDayPassClick,
    };
  },
});
</script>
