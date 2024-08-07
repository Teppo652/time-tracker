<template>{{ elapsedTime }}</template>

<script lang="ts">
import { ref, defineComponent, PropType, onMounted, onUnmounted } from "vue";
import dayjs from "dayjs";

export default defineComponent({
  name: "ElapsedTimeCounter",
  props: {
    startTime: {
      type: String as PropType<string | null>,
      default: null,
    },
  },
  setup(props) {
    const elapsedTime = ref("");
    let intervalId;
    let startTimestamp = null;

    const updateElapsedTime = () => {
      if (!props.startTime || !startTimestamp) return;

      const now = dayjs();
      const elapsedSeconds = now.diff(startTimestamp, "second");

      const hours = Math.floor(elapsedSeconds / 3600);
      const minutes = Math.floor((elapsedSeconds % 3600) / 60);
      const seconds = elapsedSeconds % 60;

      elapsedTime.value = buildTimeString(hours, minutes, seconds);
    };

    const buildTimeString = (hours, minutes, seconds) => {
      let timeString = `${hours} h `;
      if (minutes > 0) {
        timeString += `${minutes} min `;
      }
      if (seconds > 0 || timeString === "0 h ") {
        timeString += `${seconds} sec`;
      }
      return timeString.trim();
    };

    onMounted(() => {
      if (props.startTime) {
        startTimestamp = dayjs(props.startTime);
        updateElapsedTime(); // Update initially
        intervalId = setInterval(updateElapsedTime, 1000);
      }
    });

    onUnmounted(() => {
      clearInterval(intervalId);
    });

    return {
      elapsedTime,
    };
  },
});
</script>
