<template>
  <div class="bg-white border rounded-custom shadow pb-3 mb-4">
    <div class="flex justify-center items-center mb-2 px-5 pt-4 pb-2">
      <h2 class="font-semibold text-blue">Summary</h2>
    </div>
    <hr />

    <!-- Status -->
    <div class="flex flex-nowrap mb-2 px-6 pt-5">
      <h2 class="w-2/3 font-semibold">Status</h2>
      <p class="w-1/3 font-semibold text-sm text-right text-green">Ok</p>
    </div>

    <!-- Worked hours -->
    <div class="flex flex-nowrap mb-1 px-6 py-1">
      <h2 class="w-2/3 font-semibold">Worked hours</h2>
      <p class="w-1/3 font-semibold text-sm text-right">{{ workedHours }}</p>
    </div>

    <!-- Overtime -->
    <div class="flex mb-1 px-6 py-1">
      <h2 class="w-2/3 font-semibold">Overtime</h2>
      <p class="w-1/3 font-semibold text-sm text-right">{{ overtime }}</p>
    </div>

    <!-- Paid hours -->
    <div class="flex mb-1 px-6 py-1">
      <h2 class="w-2/3 font-semibold">Paid hours</h2>
      <p class="w-1/3 font-semibold text-sm text-right">{{ paidHours }}</p>
    </div>

    <!-- Requests -->
    <div class="flex flex-nowrap mb-2 px-6">
      <h2 class="w-2/3 font-semibold">Requests</h2>
      <p class="w-1/3 font-semibold text-sm text-right">0 st</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      required: true,
    },
    workedHours: {
      type: String,
      required: true,
    },
    overtime: {
      type: String,
      required: true,
    },
    paidHours: {
      type: String,
      required: true,
    },
  },
};
</script>
