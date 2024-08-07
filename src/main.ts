import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";

createApp(App).use(router).mount("#app");

/*
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import dayjs from "dayjs";
import "./index.css";

// Function to adjust dayjs to start week from Monday
const adjustDayjsWeekStart = () => {
  const localeData = dayjs().$locale(); // Get current locale data
  localeData.weekStart = 1; // Set Monday (1) as the start of the week
  dayjs().$locale(localeData); // Update dayjs's locale data
};

// Call the function to adjust dayjs
adjustDayjsWeekStart();

createApp(App).use(router).mount("#app");

*/
