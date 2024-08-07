<template>
  <div id="map" class="relative w-full h-full">
    <iframe
      class="w-full h-full border-0 shadow-lg"
      :src="`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13079.954499626606!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d4bdb03282f%3A0x2ddf43eaa7f3dc60!2sStockholm%2C%20Sweden!5e0!3m2!1sen!2sau!4v1614780255405!5m2!1sen!2sau&key=YOUR_API_KEY&zoom=15&disableDefaultUI=true&mapTypeControl=false&scaleControl=false&streetViewControl=false&rotateControl=false&fullscreenControl=false`"
      allowfullscreen=""
      loading="lazy"
      frameborder="0"
    ></iframe>
    <div
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <i class="fa-solid fa-user text-5xl text-dark-gray"></i>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
});
</script>
