<template>
  <!-- custom header for Summary -view -->
  <header
    v-if="pageTitle === 'Summary'"
    class="w-full fixed top-0 left-0 h-60 shadow-lg bg-blue"
  />

  <!-- default header -->
  <header
    v-else
    class="w-full text-white py-4 fixed top-0 left-0 z-50 shadow-lg bg-blue"
  >
    <div class="flex items-center justify-between px-4">
      <button v-if="showGoBack" @click="goBack" class="w-10">
        <i
          class="fas fa-angle-left text-2xl text-white hover:text-gray-300"
        ></i>
      </button>
      <h1 class="text-xl font-semibold mx-auto">{{ pageTitle }}</h1>
      <div v-if="showGoBack" class="w-10"></div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const pageTitle = computed(() => router.currentRoute.value.name || "Page");

    const routesWithGoBack = [
      "Activity",
      "Time tracking",
      "Time report",
      "Summary",
      "Change password",
    ];

    const showGoBack = computed(() =>
      routesWithGoBack.includes(pageTitle.value)
    );

    function goBack() {
      if (showGoBack.value) {
        router.back();
      }
    }

    return {
      pageTitle,
      showGoBack,
      goBack,
    };
  },
});
</script>
