<template>
  <footer
    class="footer-sticky fixed bottom-0 left-0 w-full bg-white text-gray-800 py-1 border-t border-gray-200"
    style="z-index: 1000"
  >
    <div
      class="container mx-auto text-center max-w-2xl mx-auto flex justify-around"
    >
      <router-link
        to="/main"
        class="group flex flex-col items-center p-2 rounded transition-transform transform hover:scale-95 hover:border-h hover:shadow-lg"
        exact-active-class="text-blue"
      >
        <i
          :class="[
            'fa-solid fa-house fa-15x transition-all duration-200 ease-in-out',
            isActive('/main') ? 'text-blue' : 'text-gray-400',
          ]"
        ></i>
        <span
          :class="[
            'text-sm mt-1.5 transition-all duration-200 ease-in-out',
            isActive('/main') ? 'text-blue' : 'text-gray-400',
          ]"
          >Home</span
        >
      </router-link>

      <router-link
        to="/time-tracking"
        class="group flex flex-col items-center p-2 pt-0.5 rounded transition-transform transform hover:scale-95 hover:border-h hover:shadow-lg"
        exact-active-class="text-blue"
      >
        <!-- when is signed in -->
        <div v-if="currentUser?.workStatus == 'isCheckedIn'" class="relative">
          <i
            :class="[
              'fa-solid fa-clock fa-15x transition-all duration-200 ease-in-out pt-1.5',
              isActive('/time-tracking') ? 'text-blue' : 'text-gray-400',
            ]"
          ></i>
          <div class="absolute top-0 right-0">
            <div
              class="w-4 h-4 bg-green rounded-full flex items-center justify-center"
            >
              <i class="p-0.5 fa-solid fa-check text-white text-xs"></i>
            </div>
          </div>
          <span
            class="text-sm mt-1 transition-all duration-200 ease-in-out block text-center"
            :class="isActive('/time-tracking') ? 'text-blue' : 'text-gray-400'"
            >Time</span
          >
        </div>
        <!-- when is not signed in -->
        <div v-else class="relative">
          <i
            :class="[
              'fa-solid fa-clock fa-15x transition-all duration-200 ease-in-out pt-1.5',
              isActive('/time-tracking') ? 'text-blue' : 'text-gray-400',
            ]"
          ></i>
          <span
            class="text-sm mt-1 transition-all duration-200 ease-in-out block text-center"
            :class="isActive('/time-tracking') ? 'text-blue' : 'text-gray-400'"
            >Time</span
          >
        </div>
      </router-link>

      <router-link
        to="/activity"
        class="group flex flex-col items-center p-2 rounded transition-transform transform hover:scale-95 hover:border-h hover:shadow-lg"
        exact-active-class="text-blue"
      >
        <i
          :class="[
            'fas fa-calendar-alt fa-15x transition-all duration-200 ease-in-out',
            isActive('/activity') || isActive('/time-report')
              ? 'text-blue'
              : 'text-gray-400',
          ]"
        ></i>
        <span
          :class="[
            'text-sm mt-1.5 transition-all duration-200 ease-in-out',
            isActive('/activity') || isActive('/time-report')
              ? 'text-blue'
              : 'text-gray-400',
          ]"
          >Activity</span
        >
      </router-link>
      <router-link
        to="/change-password"
        class="group flex flex-col items-center p-2 rounded transition-transform transform hover:scale-95 hover:border-h hover:shadow-lg"
        exact-active-class="text-blue"
      >
        <i
          :class="[
            'fa-solid fa-user fa-15x transition-all duration-200 ease-in-out',
            isActive('/change-password') ? 'text-blue' : 'text-gray-400',
          ]"
        ></i>
        <span
          :class="[
            'text-sm mt-1.5 transition-all duration-200 ease-in-out',
            isActive('/change-password') ? 'text-blue' : 'text-gray-400',
          ]"
          >{{ "Change password".replace(/ /g, "&nbsp;") }}</span
        >
      </router-link>
    </div>
  </footer>
</template>

<script>
import { mutations } from "../state";
export default {
  data() {
    return {
      currentUser: null,
    };
  },
  created() {
    this.currentUser = mutations.getUser();
  },
  methods: {
    isActive(route) {
      return this.$route.path === route;
    },
  },
};
</script>
<style scoped>
.fa-15x {
  font-size: 1.25em;
}
</style>
