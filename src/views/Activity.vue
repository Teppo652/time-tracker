<template>
  <div class="flex flex-nowrap">
    <TimeRangeSelector
      v-model="timeRange"
      :options="options"
      :selectedOption="selectedOption"
      @updateTimeRange="handleTimeRangeUpdate"
      class="relative w-1/2 py-2 mr-4"
    />

    <CompanySelector
      :companies="['Acme Inc.', 'Company 2', 'Company 3', 'Company 4']"
      :selectedCompany="'Acme Inc.'"
      class="relative w-1/2 py-2"
    />
  </div>

  <p v-if="!loading && noData" class="text-center text-sm mt-4 text-gray">
    No activity was found
  </p>
  <TimePeriodSummaryCard
    v-else
    :status="'Ok'"
    :workedHours="totalWorkedHours"
    :overtime="'0 h 0 min'"
    :paidHours="'0 h 0 min'"
  />

  <ActivityList v-if="!loading && !noData" :activities="activities" />

  <div v-if="loading" class="text-center my-22 text-blue loader">
    <i class="fas fa-spinner fa-spin"></i>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "../services/axios";
import { mutations } from "../state";
import CompanySelector from "../components/CompanySelector.vue";
import TimePeriodSummaryCard from "../components/TimePeriodSummaryCard.vue";
import ActivityList from "../components/ActivityList.vue";
import TimeRangeSelector from "../components/TimeRangeSelector.vue";
import dayjs from "dayjs";

interface Option {
  display: string;
  code: string;
}

interface Activity {
  checkIn: Date | null;
  checkOut: Date | null;
}

const today = dayjs();
const dateValue = [
  today.startOf("month").toDate(),
  today.endOf("month").toDate(),
];

const timeRange = [
  today.startOf("month").toDate(),
  today.endOf("month").toDate(),
];

import { getTimeRange } from "../dateUtils";

export default defineComponent({
  name: "Activity",
  components: {
    CompanySelector,
    TimePeriodSummaryCard,
    ActivityList,
    TimeRangeSelector,
  },
  setup() {
    const options = [
      { display: "This month", code: "this-month" },
      { display: "Last month", code: "last-month" },
      { display: "This week", code: "this-week" },
      { display: "Last week", code: "last-week" },
      { display: "Today", code: "today" },
      { display: "Yesterday", code: "yesterday" },
    ];
    const selectedOption = ref("This month");
    const timeRange = ref(getTimeRange("this-month"));
    const activities = ref([]);
    const totalWorkedHours = ref<string>();
    const loading = ref<boolean>(false);
    const noData = ref<boolean>(false);

    const handleTimeRangeUpdate = (newTimeRange) => {
      timeRange.value = getTimeRange(newTimeRange.code);
      console.log("Time Range Updated:", timeRange.value);
      getActivities();
    };

    const getActivities = async () => {
      loading.value = true;
      activities.value = [];
      console.log("**mutations.getUser():", mutations.getUser());

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            userId: mutations.getUser().id,
            startDate: timeRange.value.startDate,
            endDate: timeRange.value.endDate,
          },
        };

        const response = await axios.get(
          "http://localhost:3000/activities",
          config
        );

        if (
          response.data === undefined ||
          (response.data.length === 0 &&
            response.data.message === "No activity was found")
        ) {
          noData.value = true;
          activities.value = [];
          totalWorkedHours.value = "0";
        } else {
          noData.value = false;
          activities.value = response.data;
          totalWorkedHours.value = calculateTotalWorkedHours();
          console.log("Received activities:", response.data);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        loading.value = false;
      }
    };

    const calculateTotalWorkedHours = () => {
      let totalMinutes = 0;
      activities.value.forEach((entry) => {
        if (entry.checkIn && entry.checkOut) {
          totalMinutes += dayjs(entry.checkOut).diff(
            dayjs(entry.checkIn),
            "minutes"
          );
        }
      });

      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      return `${hours} h ${minutes} min`;
    };

    onMounted(() => {
      getActivities();
    });

    return {
      timeRange,
      options,
      selectedOption,
      getTimeRange,
      handleTimeRangeUpdate,
      totalWorkedHours,
      loading,
      activities,
      noData,
    };
  },
});
</script>
