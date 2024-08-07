<template>
  <div>
    <div class="progress-container">
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        <!-- backgroung circle -->
        <circle
          cx="50"
          cy="50"
          r="45"
          :stroke="bgStrokeColor"
          stroke-width="8"
          fill="none"
        />
        <!-- value circle -->
        <circle
          class="progress-bar"
          cx="50"
          cy="50"
          r="45"
          :stroke="color"
          stroke-width="8"
          fill="none"
          :stroke-dasharray="progressCircumference"
          :stroke-dashoffset="progressOffset"
          transform="rotate(-90, 50, 50)"
        />
      </svg>
      <div class="text1">
        {{ text1.replace(/ /g, "&nbsp;") }}
      </div>
      <div class="text2">
        {{ text2.replace(/ /g, "&nbsp;") }}
      </div>
      <div class="text3">
        {{ text3.replace(/ /g, "&nbsp;") }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CircleProgressBar",
  props: {
    text1: {
      type: String,
      required: true,
    },
    text2: {
      type: String,
      required: true,
    },
    text3: {
      type: String,
      required: true,
    },
    maxValue: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  computed: {
    bgStrokeColor() {
      return "#e8e8e8";
    },
    progressCircumference() {
      return 2 * Math.PI * 45;
    },
    progressOffset() {
      return this.progressCircumference * (1 - this.progress / 100);
    },
    progress() {
      return (this.value / this.maxValue) * 100;
    },
  },
};
</script>

<style scoped>
.progress-container {
  position: relative;
  display: inline-block;
}
.text1,
.text2,
.text3 {
  position: absolute;
  transform: translate(-50%, -50%);
}
.text1 {
  font-weight: 600;
  top: 41%;
  left: 50%;
  font-size: 1.45rem;
  color: #3670c2;
}
.text2,
.text3 {
  top: 55%;
  left: 50%;
  font-size: 0.8rem;
}
.text3 {
  top: 69%;
  font-size: 0.65rem;
  color: #8c8c8c;
}
</style>
