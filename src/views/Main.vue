<template>
  <div v-if="showCheckedOutSplash">
    <CheckedOut :workedTime="workedTime" />
  </div>

  <div v-else>
    <!-- content -->
    <UserInfoCard
      :company="currentUser.company"
      :userName="currentUser.name"
      @editUserInfo-click="handleEditUserInfoClick"
    />

    <StatusCard
      :lastCheckIn="currentUser.lastCheckIn"
      :lastCheckOut="currentUser.lastCheckOut"
      :userIsCheckedIn="false"
      :userHasDaypass="false"
      @changeStatus-click="handleChangeStatusClick"
      @dayPass-click="handleDayPassClick"
    />

    <TimeSummaryCard
      :monthlyHours="currentUser.totalHoursThisMonth"
      :monthlyTotalHours="160"
      :weeklyHours="currentUser.totalHoursThisWeek"
      :weeklyTotalHours="40"
      @initialSalary-click="handleInitialSalaryClick"
      @showSalary-click="handleShowSalaryClick"
    />

    <DayPassCard />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { appState, mutations } from "../state";
import UserInfoCard from "../components/UserInfoCard.vue";
import StatusCard from "../components/StatusCard.vue";
import TimeSummaryCard from "../components/TimeSummaryCard.vue";
import DayPassCard from "./DayPassCard.vue";
import CheckedOut from "./CheckedOut.vue";

export default defineComponent({
  name: "Main",
  components: {
    UserInfoCard,
    StatusCard,
    TimeSummaryCard,
    DayPassCard,
    CheckedOut,
  },
  setup() {
    const route = useRoute();
    const showCheckedOutSplash = ref(false);
    //const workedTime = ref<string | null>(null);
    const currentUser = ref(mutations.getUser());
    const workedTime = computed(() => route.query.workedTime as string);

    watch(
      () => appState.currentUser,
      (newUser) => {
        currentUser.value = newUser;
      }
    );

    const getUserLocation = async () => {
      try {
        const getPosition = (): Promise<GeolocationPosition> => {
          return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
        };

        const position = await getPosition();
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        mutations.updateUserLocation(latitude, longitude);
      } catch (error) {
        console.error("Error getting user's position:", error);
      }
    };

    onMounted(() => {
      showCheckedOutSplash.value = route.query.showCheckedOutSplash === "true";

      if (!currentUser.value.location) {
        getUserLocation();
      }

      if (currentUser.value.lastCheckOut === "") {
        mutations.updateUser({
          workStatus: "isCheckedIn",
        });
      } else {
        mutations.updateUser({
          workStatus: "isCheckedOut",
        });
      }
      currentUser.value = mutations.getUser();

      setTimeout(() => {
        showCheckedOutSplash.value = false;
      }, 4000);
    });

    const handleEditUserInfoClick = () => {
      console.log("EditUserInfo clicked");
    };

    const handleChangeStatusClick = () => {
      console.log("ChangeStatus clicked");
    };

    const handleDayPassClick = () => {
      console.log("DayPass clicked");
    };

    const handleInitialSalaryClick = () => {
      console.log("InitialSalary clicked");
    };

    const handleShowSalaryClick = () => {
      console.log("ShowSalary clicked");
    };

    return {
      showCheckedOutSplash,
      workedTime,
      currentUser,
      handleEditUserInfoClick,
      handleChangeStatusClick,
      handleDayPassClick,
      handleInitialSalaryClick,
      handleShowSalaryClick,
    };
  },
});
</script>
