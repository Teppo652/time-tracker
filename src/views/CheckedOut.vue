<template>
  <div
    class="flex flex-col min-h-screen items-center justify-start font-semibold text-xl text-blue"
    style="margin-top: 45%"
  >
    <svg
      width="150"
      height="150"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      class="icon"
    >
      <circle cx="12" cy="12" r="10" class="text-blue-700" />
      <path
        d="M11 15.5a1 1 0 01-.71-.29l-3-3a1 1 0 111.42-1.42L11 13.09l4.29-4.3a1 1 0 011.42 1.42l-5 5a1 1 0 01-.71.29z"
        class="text-white"
      />
    </svg>
    <h1 class="text-3xl font-bold mt-5">Well done!</h1>
    <p class="mt-7">You have now checked out.</p>
    <p class="mt-5">Total working time</p>
    <div class="py-1 px-5 mt-4 rounded-2xl text-sm text-white bg-blue">
      {{ workedTime }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    workedTime: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.icon circle {
  fill: #15659e;
}
.icon path {
  fill: #fff;
}
</style>
