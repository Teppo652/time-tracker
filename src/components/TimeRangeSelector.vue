<template>
  <div>
    <Menu as="div">
      <MenuButton
        class="relative w-full bg-white pr-5 border border-white rounded-3xl shadow py-2 px-6 relative overflow-hidden button-hover-effect flex items-center justify-between text-sm font-semibold text-blue"
        @click="isOpen = !isOpen"
      >
        {{ localSelectedOption }}
        <i class="fas fa-angle-down fa-lg text-blue"></i>
      </MenuButton>

      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <MenuItems
          v-show="isOpen"
          class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-3xl bg-white shadow-xl hover:cursor-pointer"
        >
          <div class="py-1">
            <MenuItem
              v-for="(option, index) in options"
              :key="index"
              v-slot="{ active }"
            >
              <span
                :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'block px-4 py-2 text-sm',
                ]"
                @click="handleItemClick(option)"
              >
                {{ option.display }}
              </span>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script setup>
import { defineProps, ref, defineEmits, watch } from "vue";

const props = defineProps({
  options: {
    type: Array,
    required: true,
    default: () => [],
  },
  selectedOption: {
    type: String,
    required: true,
    default: "",
  },
});

const isOpen = ref(false);
const localSelectedOption = ref(props.selectedOption);
const emit = defineEmits(["updateTimeRange"]);
watch(
  () => props.selectedOption,
  (newVal) => {
    localSelectedOption.value = newVal;
  }
);
const handleItemClick = (option) => {
  console.log(`Selected option: ${option.display}`);
  localSelectedOption.value = option.display;
  isOpen.value = false;
  emit("updateTimeRange", { code: option.code });
};
</script>
