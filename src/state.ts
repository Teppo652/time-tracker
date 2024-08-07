import { reactive, readonly } from "vue";

interface AppState {
  currentUser: User | null;
  activity: Activity;
  isLoggedIn: boolean;
  timeElapsed: number;
  checkInStatus: string;
}

interface User {
  id: number;
  company: string;
  personalId: string;
  name: string;
  password: string;
  role: "user" | "admin";
  lastCheckIn: string;
  lastCheckIn_id: string;
  lastCheckOut?: string;
  timeElapsed?: number;
  workStatus?: String;
  location?: object;
}

const state: AppState = reactive({
  currentUser: null,
  isLoggedIn: false,
  timeElapsed: 0,
  checkInStatus: "",
});

// Mutations
export const mutations = {
  setUser(user: User | null): void {
    state.currentUser = user;
    state.isLoggedIn = !!user;
  },
  setActivity(activity: Activity): void {
    state.activity = activity;
  },
  updateUser(updates: { [key: string]: any }) {
    if (!state.currentUser) {
      console.error("No current user to update");
      return;
    }

    const fields = [
      "name",
      "lastCheckIn",
      "lastCheckIn_id",
      "lastCheckOut",
      "totalHoursThisMonth",
      "totalHoursThisWeek",
      "workStatus",
      "location",
    ];

    fields.forEach((field) => {
      if (updates[field] !== undefined && updates[field] !== null) {
        state.currentUser[field] = updates[field];
      }
    });
  },
  updateWorkingStatus(newStatus: string): void {
    if (state.currentUser) {
      state.currentUser.workStatus = newStatus;
    }
  },
  getUser(): User | null {
    return state.currentUser;
  },
  updateUserLocation(latitude: number, longitude: number): void {
    if (state.currentUser) {
      state.currentUser.location = {
        lat: latitude,
        lng: longitude,
      };
    }
  },
};

export const appState = readonly(state);
