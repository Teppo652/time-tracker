import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Main from "../views/Main.vue";
import TimeTracking from "../views/TimeTracking.vue";
import Activity from "../views/Activity.vue";
import TimeReport from "../views/TimeReport.vue";
import Summary from "../views/Summary.vue";
import ChangePassword from "../views/ChangePassword.vue";
import CheckedOut from "../views/CheckedOut.vue";
import { appState } from "../state";

const routes = [
  {
    path: "/",
    redirect: () => {
      const isAuthenticated = !!appState.currentUser;
      return isAuthenticated ? "/main" : "/login";
    },
  },
  { path: "/login", name: "Login", component: Login },
  {
    path: "/main",
    name: "Home",
    component: Main,
    meta: { requiresAuth: true },
  },
  {
    path: "/time-tracking",
    name: "Time tracking",
    component: TimeTracking,
    meta: { requiresAuth: true },
  },
  {
    path: "/activity",
    name: "Activity",
    component: Activity,
    meta: { requiresAuth: true },
  },
  {
    path: "/time-report",
    name: "Time report",
    component: TimeReport,
    meta: { requiresAuth: true },
  },
  {
    path: "/summary/:activityId",
    name: "Summary",
    component: Summary,
    meta: { requiresAuth: true },
  },
  {
    path: "/change-password",
    name: "Change password",
    component: ChangePassword,
    meta: { requiresAuth: true },
  },
  {
    path: "/checked-out",
    name: "CheckedOut",
    component: CheckedOut,
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!appState.currentUser;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
