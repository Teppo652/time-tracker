<template>
  <div class="appBody flex flex-col min-h-screen">
    <div v-if="showWelcomeScreen">
      <WelcomeScreen />
    </div>

    <div v-else>
      <Header v-if="showHeader" />
      <div class="flex flex-col h-screen">
        <!-- top bg area -->
        <main
          class="relative w-full bg-gray-100"
          :class="showMap ? 'h-1/3 mt-[-83px]' : ''"
        >
          <div
            class="absolute top-2/3 left-1/2 w-full max-w-sm transform -translate-x-1/2 mt-20 z-10 pb-20"
          >
            <router-view />
          </div>
          <Map
            v-if="showMap"
            :lat="null"
            :lng="null"
            class="absolute inset-0 z-0 mt-20"
          />
        </main>
        <!-- bg bottom part -->
        <div class="flex-grow bg-gradient-to-b from-gray-100 to-white"></div>
      </div>
      <FooterNavi v-if="isAuthenticated" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { appState } from "./state";
import WelcomeScreen from "./views/WelcomeScreen.vue";
import Header from "./components/Header.vue";
import FooterNavi from "./components/FooterNavi.vue";
import Map from "./views/Map.vue";

export default defineComponent({
  name: "App",
  components: {
    WelcomeScreen,
    Header,
    FooterNavi,
    Map,
  },
  setup() {
    const route = useRoute();

    const showHeader = computed(() => {
      const hideHeaderInRoutes = ["Edit times"];
      return !hideHeaderInRoutes.includes(route.name ?? "");
    });
    const showMapInRoutes = ["Time tracking"];
    const showMap = computed(() => showMapInRoutes.includes(route.name ?? ""));

    return {
      showHeader,
      showMap,
    };
  },
  data() {
    return {
      showWelcomeScreen: true,
    };
  },
  created() {
    this.status = this.$route.params.status;
  },
  computed: {
    isAuthenticated() {
      return !!appState.currentUser;
    },
  },
  mounted() {
    setTimeout(() => {
      this.showWelcomeScreen = false;
    }, 2000);
  },
});
</script>

<style scoped>
#app {
  width: 100%;
  height: 100%;
}
</style>
