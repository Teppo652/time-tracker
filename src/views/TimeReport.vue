<template>
  <div class="mt-[-1px]">
    <!-- show date range -->
    <h2 class="mb-1 text-2xl text-center font-semibold mb-6">
      {{ showSelectedDate }}
    </h2>

    <!-- Status -->
    <div
      class="flex flex-nowrap bg-white border rounded-2xl shadow mb-3.5 px-4 py-3"
    >
      <h2 class="w-1/2 font-semibold">Status</h2>
      <p class="w-1/2 font-semibold text-sm text-right text-green">Accepted</p>
    </div>

    <!-- Work place -->
    <div
      class="flex flex-nowrap bg-white border rounded-2xl shadow mb-3.5 px-4 py-3"
    >
      <h2 class="w-1/2 font-semibold">Work place</h2>
      <p class="w-1/2 text-right">{{ company }}</p>
    </div>

    <!-- Time in out -->
    <div class="flex flex-nowrap">
      <h2
        class="w-1/2 flex flex-nowrap bg-white border rounded-2xl shadow mb-3.5 px-4 py-3 mr-4"
      >
        <span class="w-1/2 font-semibold">Time in</span>
        <span class="w-1/2 text-right">{{ checkIn }}</span>
      </h2>
      <p
        class="w-1/2 flex flex-nowrap bg-white border rounded-2xl shadow mb-3.5 px-4 py-3"
      >
        <span class="w-1/2 font-semibold">Time out</span>
        <span class="w-1/2 text-right">{{ checkOut }}</span>
      </p>
    </div>

    <!-- Extra time -->
    <div
      class="flex flex-nowrap bg-white border rounded-2xl shadow mb-3.5 px-4 py-3"
    >
      <h2 class="w-1/2 font-semibold">Extra time</h2>
      <p class="w-1/2 text-right">None</p>
    </div>

    <!-- Work time -->
    <div
      class="flex flex-nowrap bg-white border rounded-2xl shadow mb-3.5 px-4 py-3"
    >
      <h2 class="w-1/2 font-semibold">Work time</h2>
      <p class="w-1/2 text-right">{{ workTime }}</p>
    </div>

    <!-- Meal benefit  -->
    <div
      class="flex flex-nowrap bg-white border rounded-2xl shadow mb-3.5 px-4 py-3"
    >
      <h2 class="w-1/2 font-semibold">Meal benefit (Breakfast)</h2>
      <p class="w-1/2 text-right">Not included</p>
    </div>

    <!-- Meal benefit  -->
    <div
      class="flex flex-nowrap bg-white border rounded-2xl shadow mb-3.5 px-4 py-3"
    >
      <h2 class="w-1/2 font-semibold">Meal benefit (Lunch)</h2>
      <p class="w-1/2 text-right">Not included</p>
    </div>

    <!-- Check in place -->
    <div
      class="flex flex-nowrap bg-white border rounded-2xl shadow mb-3.5 px-4 py-3"
    >
      <h2 class="w-1/2 font-semibold">Check in place</h2>
      <p class="w-1/2 text-right">Personnel page</p>
    </div>

    <!-- Check out place -->
    <div class="flex flex-nowrap bg-white border rounded-2xl shadow px-4 py-3">
      <h2 class="w-1/2 font-semibold">Check out place</h2>
      <p class="w-1/2 text-right">Personnel page</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import dayjs from "dayjs";
import { getTimeDifference } from "../dateUtils.js";

export default defineComponent({
  name: "TimeReport",
  setup() {
    const route = useRoute();

    const company = computed(() => route.query.company as string);
    const checkIn = computed(() => route.query.checkIn as string);
    const checkOut = computed(() => route.query.checkOut as string);
    const workTime = computed(() => route.query.workTime as string);

    const showSelectedDate = computed(() => {
      return dayjs(route.params.selectedDate as string).format(
        "ddd DD MMM YYYY"
      );
    });

    return {
      company,
      checkIn,
      checkOut,
      workTime,
      showSelectedDate,
      getTimeDifference,
    };
  },
});
</script>
