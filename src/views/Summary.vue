<template>
  <div class="flex flex-col items-center">
    <!-- space-y-4 -->
    <p class="text-2xl font-semibold text-white">Worktime summary</p>
    <p class="mt-1 mb-1.5 text-2xl font-semibold text-white">
      {{ workedTime }}
    </p>

    <div
      class="font-semibold text-white py-1 px-5 mb-2 rounded-xl-custom bg-dark-blue"
    >
      {{ workedTime }}
    </div>

    <div class="flex flex-nowrap w-full mt-3">
      <!-- in -->
      <div
        class="relative text-center w-1/2 bg-white mr-4 border border-white rounded-2xl shadow mb-1.5 p-3 relative overflow-hidden"
      >
        <p class="justify-center font-bold w-full">Time in</p>
        <div
          class="flex items-center justify-center mt-[-4px] mb-[-9px] ml-[-14px] text-right"
        >
          <i class="fas fa-edit text-gray-300"></i>
          <input
            type="number"
            v-model="checkInHours"
            min="0"
            max="23"
            required
            class="font-semibold text-2xl text-center w-14 border rounded-xl border-none appearance-none text-blue"
            style="appearance: textfield; padding-right: 2px; text-align: right"
          />
          <p class="text-xl font-bold mb-0 text-blue">:</p>
          <input
            type="number"
            v-model="checkInMinutes"
            min="0"
            max="59"
            required
            class="font-semibold text-2xl text-center w-14 border rounded-xl border-none appearance-none text-blue"
            style="appearance: textfield; padding-left: 2px; text-align: left"
          />
        </div>
      </div>
      <!-- out -->
      <div
        class="relative text-center w-1/2 bg-white border border-white rounded-2xl shadow mb-1.5 p-3 relative overflow-hidden"
      >
        <p class="justify-center font-bold w-full">Time out</p>

        <div
          class="flex items-center justify-center mt-[-4px] mb-[-9px] ml-[-14px]"
        >
          <i class="fas fa-edit text-gray-300"></i>
          <input
            type="number"
            v-model="checkOutHours"
            min="0"
            max="23"
            required
            class="font-semibold text-2xl text-center w-14 border rounded-xl border-none appearance-none text-blue"
            style="appearance: textfield; padding-right: 2px; text-align: right"
          />
          <p class="text-xl font-bold mb-0 text-blue">:</p>
          <input
            type="number"
            v-model="checkOutMinutes"
            min="0"
            max="59"
            required
            class="font-semibold text-2xl text-center w-14 border rounded-xl border-none appearance-none text-blue"
            style="appearance: textfield; padding-left: 2px; text-align: left"
          />
        </div>
      </div>
    </div>

    <!-- buttons -->
    <button
      class="w-full font-semibold text-center text-sm p-2 rounded-xl-custom mt-2 mb-3 bg-light-gray button-hover-effect hover:text-dark-gray"
    >
      No break
    </button>
    <button
      @click="updateTimes"
      class="w-full font-semibold text-xl text-white py-3 rounded-xl-custom mb-4 bg-green button-hover-effect"
    >
      Confirm
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { mutations } from "../state";
import {
  isNumber,
  getFormattedTime,
  getTimeDifference,
  validateHHMM,
  constructNewDateTime,
} from "../dateUtils.js";
import dayjs from "dayjs";

export default defineComponent({
  name: "Summary",
  setup() {
    const route = useRoute();
    const router = useRouter();

    const currentUser = ref(mutations.getUser());
    const activityId = route.params.activityId as string;

    const checkInHours = ref("");
    const checkInMinutes = ref("");
    const checkOutHours = ref("");
    const checkOutMinutes = ref("");
    const workedTime = ref("");

    onMounted(() => {
      workedTime.value = getTimeDifference(
        currentUser.value.lastCheckIn,
        currentUser.value.lastCheckOut
      );
      checkInHours.value = getFormattedTime(
        currentUser.value.lastCheckIn,
        "hh"
      );
      checkInMinutes.value = getFormattedTime(
        currentUser.value.lastCheckIn,
        "min"
      );
      checkOutHours.value = getFormattedTime(
        currentUser.value.lastCheckOut,
        "hh"
      );
      checkOutMinutes.value = getFormattedTime(
        currentUser.value.lastCheckOut,
        "min"
      );
    });

    const validateTimeValues = (): boolean => {
      const checkInTimeIsValid = validateHHMM(
        `${checkInHours.value}:${checkInMinutes.value}`
      );
      const checkOutTimeIsValid = validateHHMM(
        `${checkOutHours.value}:${checkOutMinutes.value}`
      );
      if (!checkInTimeIsValid || !checkOutTimeIsValid) {
        alert("Please check times");
        return false;
      }
      return true;
    };

    const updateTimes = async () => {
      if (!validateTimeValues()) return;

      if (
        !isNumber(checkInHours.value) ||
        !isNumber(checkInMinutes.value) ||
        !isNumber(checkOutHours.value) ||
        !isNumber(checkOutMinutes.value)
      ) {
        alert("Time has unaccepted characters");
        return;
      }

      const newCheckInDateTime = constructNewDateTime(
        currentUser.value.lastCheckIn,
        checkInHours.value,
        checkInMinutes.value
      );
      const newCheckOutDateTime = constructNewDateTime(
        currentUser.value.lastCheckOut,
        checkOutHours.value,
        checkOutMinutes.value
      );

      if (
        currentUser.value.lastCheckIn !== newCheckInDateTime ||
        currentUser.value.lastCheckOut !== newCheckOutDateTime
      ) {
        if (!dayjs(newCheckInDateTime).isBefore(dayjs(newCheckOutDateTime))) {
          alert("Check in time must be before check out time");
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
        try {
          await axios.put(
            `http://localhost:3000/activities/${activityId}/update`,
            {
              userId: currentUser.value.id,
              checkIn: newCheckInDateTime,
              checkOut: newCheckOutDateTime,
              location: "",
            },
            config
          );
          mutations.updateUser({
            lastCheckIn: newCheckInDateTime,
            lastCheckOut: newCheckOutDateTime,
          });
        } catch (error) {
          console.error("Failed to update times:", error);
          let errorMessage = "Failed to update times";
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            errorMessage += `: ${error.response.data.error}`;
          }
          throw new Error(errorMessage);
        }
      }

      router.push({
        path: "/main",
        query: {
          showCheckedOutSplash: "true",
          workedTime: workedTime.value,
        },
      });
    };

    return {
      currentUser,
      activityId,
      checkInHours,
      checkInMinutes,
      checkOutHours,
      checkOutMinutes,
      workedTime,
      validateTimeValues,
      updateTimes,
      getFormattedTime,
      getTimeDifference,
    };
  },
});
</script>

<style scoped>
/* hide arrows from number input fields */
input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
  -webkit-appearance: none; /* Chrome, Safari, Edge */
  appearance: none; /* Standard */
}
</style>
