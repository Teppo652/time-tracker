<template>
  <div
    class="flex items-center justify-center bg-white p-3 border rounded-xl-custom shadow mt-16 mb-4 relative"
  >
    <div class="relative text-center p-1">
      <!-- company -->
      <p class="font-bold mb-2">{{ currentUser?.company }}</p>
      <div
        v-if="
          currentUser?.workStatus === 'isCheckedIn' ||
          currentUser?.workStatus === 'beforeCheckOut'
        "
      >
        <div v-if="currentUser.lastCheckIn">
          <!-- elapsed time - 0 hour 0 min 0 sec -->
          <p class="font-bold text-2xl mb-3 text-blue">
            <ElapsedTimeCounter
              :startTime="
                currentUser
                  ? currentUser.lastCheckIn
                  : currentUser.lastCheckOut === nullcounterStartTime
              "
            />
          </p>
          <!-- checked in since - hh:mm -->
          <p
            v-if="
              currentUser &&
              currentUser.value &&
              currentUser.value.lastCheckIn !== undefined
            "
            class="font-bold text-dark-gray"
          >
            Checked in since
            <span class="ml-5 text-blue">{{ checkedInSince }}</span>
          </p>
        </div>
      </div>
      <p
        v-else-if="currentUser?.workStatus === 'beforeCheckIn'"
        class="font-bold text-xl text-dark-gray"
      >
        Not yet checked in
      </p>
      <p v-else class="font-bold text-xl text-dark-gray">Not checked in</p>
    </div>
  </div>

  <!-- check in -->
  <button
    v-if="currentUser?.workStatus === 'isCheckedOut'"
    class="w-full font-semibold text-xl bg-blue text-white py-3 rounded-xl-custom mb-4 transition-transform transform hover:scale-95 hover:bg-opacity-70 hover:shadow-lg"
    @click="updateWorkingStatus('beforeCheckIn')"
  >
    Check in
  </button>

  <!-- verify check in -->
  <div v-if="currentUser?.workStatus === 'beforeCheckIn'">
    <button
      class="w-full font-semibold text-xl bg-green text-white py-3 rounded-xl-custom mb-4 transition-transform transform hover:scale-95 hover:bg-opacity-70 hover:shadow-lg"
      @click="updateWorkingStatus('isCheckedIn')"
    >
      Verify check in
    </button>

    <!-- cancel check in -->
    <button
      class="w-full font-semibold text-xl bg-red text-white py-3 rounded-xl-custom mb-4 transition-transform transform hover:scale-95 hover:bg-opacity-70 hover:shadow-lg"
      @click="updateWorkingStatus('isCheckedOut')"
    >
      Cancel
    </button>
  </div>

  <!-- check out -->
  <button
    v-if="currentUser?.workStatus === 'isCheckedIn'"
    class="w-full font-semibold text-xl text-white bg-red py-3 rounded-xl-custom mb-4 transition-transform transform hover:scale-95 hover:bg-opacity-70 hover:shadow-lg"
    @click="updateWorkingStatus('beforeCheckOut')"
  >
    Check out
  </button>

  <!-- verify check out -->
  <div v-if="currentUser?.workStatus === 'beforeCheckOut'">
    <button
      class="w-full font-semibold text-xl bg-green text-white py-3 rounded-xl-custom mb-4 transition-transform transform hover:scale-95 hover:bg-opacity-70 hover:shadow-lg"
      @click="updateWorkingStatus('isCheckedOut')"
    >
      Verify check out
    </button>

    <!-- cancel check out -->
    <button
      class="w-full font-semibold text-xl text-white bg-red py-3 rounded-xl-custom mb-4 transition-transform transform hover:scale-95 hover:bg-opacity-70 hover:shadow-lg"
      @click="updateWorkingStatus('isCheckedIn')"
    >
      Cancel
    </button>
  </div>

  <!-- day pass -->
  <button class="font-semibold pt-3 text-hover-effect text-blue">
    <i class="far fa-calendar-alt text-light-blue-500 ml-2 mr-1"></i>
    Current daypass
  </button>

  <div class="flex flex-col items-center p-2">
    <i class="fas fa-search text-dark-gray"></i>
    <span class="text-sm mt-4 text-dark-gray">No upcoming daypass found</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { appState, mutations } from "../state";
import dayjs from "dayjs";
import ElapsedTimeCounter from "../components/ElapsedTimeCounter.vue";
import { getCurrentTime, getFormattedTime } from "../dateUtils";

export default defineComponent({
  name: "TimeTracking",
  components: {
    ElapsedTimeCounter,
  },
  setup() {
    const currentUser = ref<any>(null);
    const checkedInSince = ref<string | null>(null);
    const router = useRouter();
    const counterStartTime = ref<string>(null);

    const updateWorkingStatus = async (newStatus: string) => {
      mutations.updateWorkingStatus(newStatus);

      if (newStatus === "isCheckedIn" || newStatus === "isCheckedOut") {
        //checkedInSince.value = new Date().toISOString();
        await updateDB(newStatus);
      }

      if (newStatus === "isCheckedOut") {
        const path = `/summary/${currentUser.value.lastCheckIn_id}`;
        router.push({ path: path });
      }

      currentUser.value = mutations.getUser();
    };

    const updateDB = async (newStatus: string) => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };

        let response;
        let newCheckIn: string | undefined;
        switch (newStatus) {
          case "isCheckedIn":
            newCheckIn = new Date().toISOString();
            checkedInSince.value = newCheckIn;
            response = await axios.post(
              "http://localhost:3000/activities",
              {
                userId: currentUser.value.id,
                checkIn: newCheckIn,
                checkOut: "",
                location: currentUser.value.location,
              },
              config
            );
            if (response.data.lastCheckIn_id) {
              mutations.updateUser({
                lastCheckIn: newCheckIn,
                lastCheckIn_id: response.data.lastCheckIn_id,
                lastCheckOut: "",
              });
            }
            counterStartTime.value = getCurrentTime();
            break;
          case "isCheckedOut":
            response = await axios.put(
              `http://localhost:3000/activities/${currentUser.value.lastCheckIn_id}/checkout`,
              {
                userId: currentUser.value.id,
                checkOut: new Date().toISOString(),
              },
              config
            );
            if (response.data.checkOut) {
              //console.log(response.data.checkOut);
              mutations.updateUser({
                lastCheckOut: response.data.checkOut,
              });
            }
            break;
          default:
            throw new Error("Invalid status");
        }
      } catch (error) {
        console.error("Failed to update work status:", error);
        throw error;
      }
    };

    onMounted(() => {
      currentUser.value = mutations.getUser();
      if (currentUser.value.lastCheckIn && !currentUser.value.lastCheckOut) {
        updateWorkingStatus("isCheckedIn");
        mutations.updateWorkingStatus("isCheckedIn"); // ??
      }
      //
      if (currentUser.value.lastCheckIn) {
        checkedInSince.value = getFormattedTime(
          currentUser.value.lastCheckIn,
          "time24"
        );
      }
    });

    return {
      currentUser,
      checkedInSince,
      updateWorkingStatus,
    };
  },
});
</script>
