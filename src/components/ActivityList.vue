<template>
  <div class="mb-50">
    <div
      v-for="(activities, date) in filteredActivities"
      :key="date"
      class="mb-6"
    >
      <div class="mb-2">
        <span class="flex flex-nowrap font-semibold m-4 my-3 text-dark-gray">
          {{ formatDate(date) }}
        </span>
      </div>
      <div
        v-for="activity in activities"
        :key="activity._id"
        class="flex bg-white py-3 px-6 mb-2 border rounded-2xl shadow relative cursor-pointer w-full transition-transform transform hover:text-blue hover:border-blue"
        style="hover: button-hover-effect"
      >
        <router-link
          :to="{
            name: 'Time report',
            query: {
              company: currentUser.company,
              checkIn: formatTime(activity.checkIn),
              checkOut: formatTime(activity.checkOut),
              workTime: getTimeDifference(activity.checkIn, activity.checkOut),
            },
          }"
          class="flex w-full justify-between items-center space-x-4 h-5"
        >
          <span class="flex items-center space-x-2">
            <p class="font-semibold">Time:</p>
            <p>
              {{ formatTime(activity.checkIn) }} -
              {{ activity.checkOut ? formatTime(activity.checkOut) : "N/A" }}
            </p>
          </span>
          <span v-if="activity.checkOut" class="flex items-center space-x-2">
            <p class="font-semibold">Total time:</p>
            <p>
              {{ getTimeDifference(activity.checkIn, activity.checkOut) }}
            </p>
          </span>
          <span class="flex items-center space-x-2">
            <i class="fas fa-angle-right text-xl text-gray-400"></i>
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, PropType } from "vue";
import { mutations } from "../state";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

interface Activity {
  _id: string;
  checkIn: string;
  checkOut?: string;
}

export default defineComponent({
  name: "ActivityList",
  props: {
    activities: {
      type: Array as PropType<Activity[]>,
      required: true,
    },
  },
  setup(props) {
    const currentUser = ref(mutations.getUser());

    const formatTime = (isoString: string): string => {
      return dayjs(isoString).format("HH:mm");
    };

    const formatDate = (dateString: string): string => {
      return dayjs(dateString).add(2, "hour").format("dddd, D MMM YYYY");
    };

    const getTimeDifference = (checkIn: string, checkOut: string): string => {
      return dayjs
        .duration(dayjs(checkOut).diff(dayjs(checkIn)))
        .format("H [h] m [min]");
    };

    const filteredActivities = computed(() => {
      return props.activities.reduce(
        (groups: Record<string, Activity[]>, activity: Activity) => {
          const date = activity.checkIn.split("T")[0];
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(activity);
          return groups;
        },
        {}
      );
    });

    return {
      currentUser,
      formatTime,
      formatDate,
      getTimeDifference,
      filteredActivities,
    };
  },
});
</script>
