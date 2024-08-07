<template>
  <div>
    <h2>Total Worked Hours</h2>
    activityData: {{ activityData }}
    <p>Current Month: {{ currentMonthTotal }} hours</p>
    <p>Current Week ({{ currentWeek }}): {{ currentWeekTotal }} hours</p>
  </div>
</template>

<script>
export default {
  props: {
    activityData: {
      type: Array,
      required: true,
    },
  },
  computed: {
    currentMonthTotal() {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth(); // 0-11

      const monthActivities = this.activityData.filter((activity) => {
        const activityDate = new Date(activity.date);
        return activityDate.getMonth() === currentMonth;
      });

      return this.calculateTotalHours(monthActivities);
    },
    currentWeek() {
      const currentDate = new Date();
      const currentWeekNumber = this.getWeekNumber(currentDate);
      const currentWeekDay = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
      });
      return `${currentWeekNumber} (${currentWeekDay})`;
    },
    currentWeekTotal() {
      const currentDate = new Date();
      const currentWeekNumber = this.getWeekNumber(currentDate);

      const weekActivities = this.activityData.filter((activity) => {
        const activityDate = new Date(activity.date);
        const activityWeekNumber = this.getWeekNumber(activityDate);
        return activityWeekNumber === currentWeekNumber;
      });

      return this.calculateTotalHours(weekActivities);
    },
  },
  methods: {
    calculateTotalHours(activities) {
      let totalHours = 0;
      console.log("calculateTotalHours::: ", activities);
      activities.forEach((activity) => {
        // TODO: remove hard coded dates"
        const checkInTime = new Date(`2022-01-01T${activity.checkIn}`);
        const checkOutTime = new Date(`2022-01-01T${activity.checkOut}`);
        const hoursWorked = (checkOutTime - checkInTime) / (1000 * 60 * 60);
        totalHours += hoursWorked;
      });
      return totalHours.toFixed(2);
    },
    getWeekNumber(date) {
      const startOfYear = new Date(date.getFullYear(), 0, 1);
      const diff = date - startOfYear;
      const oneWeek = 604800000; // milliseconds
      const weekNumber = Math.ceil(
        (diff + startOfYear.getDay() * 86400000) / oneWeek
      );
      return weekNumber;
    },
  },
};
</script>
