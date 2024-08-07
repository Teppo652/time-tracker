<template>
  <button
    class="flex bg-white mb-4 p-3 text-left border rounded-custom shadow relative w-full cursor-pointer"
    @click="handleClick"
  >
    <div class="p-1">
      <p class="font-bold mb-2">{{ company }}</p>
      <p class="font-semibold text-blue">{{ userName }}</p>
    </div>
    <!-- user icon -->
    <div class="flex items-center ml-auto p-2">
      <i class="fa-solid fa-user text-5xl text-dark-gray z-10"></i>
    </div>
  </button>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    company: String,
    userName: String,
  },
  setup(props, { emit }) {
    const handleClick = () => {
      emit("editUserInfo-click");
    };

    return {
      handleClick,
    };
  },
});
</script>
