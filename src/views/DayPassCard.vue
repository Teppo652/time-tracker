<template>
  <!-- NOTE: not in use yet -->
  <button class="font-semibold py-3 text-blue cursor-pointer w-full text-left">
    <i class="far fa-calendar-alt text-blue ml-2 mr-1"></i>
    Upcoming daypass
  </button>

  <div class="flex flex-col items-center p-2">
    <i class="fas fa-search text-3xl text-gray-400"></i>
    <span class="text-sm mt-4 text-gray-400"> No upcoming daypass found </span>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({});
</script>
