<template>
  <div class="flex items-start justify-center min-h-screen">
    <div class="w-full max-w-md pt-2 p-8 space-y-8">
      <p
        v-if="updateSuccess"
        class="text-xl text-center bg-green shadow text-white p-3 rounded border"
      >
        Password changed successfully
      </p>
      <p
        v-else-if="updateFailed"
        class="text-xl text-center bg-red shadow text-white p-3 rounded border"
      >
        Password change failed
      </p>
      <form v-else @submit.prevent="changePassword">
        <div class="space-y-4">
          <div class="block">
            <label for="currentPassword" class="block font-semibold"
              >Current password</label
            >
            <input
              v-model="currentPassword"
              type="text"
              id="currentPassword"
              class="block w-full mt-1 text-xl bg-white p-4 border-white rounded-xl shadow mb-4 relative button-hover-effect"
            />
          </div>
          <div>
            <label for="newPassword" class="block font-semibold"
              >New password</label
            >
            <input
              v-model="newPassword"
              type="password"
              id="newPassword"
              class="block w-full mt-1 text-xl bg-white p-4 border-white rounded-xl shadow mb-4 relative button-hover-effect"
            />
          </div>
          <div>
            <label for="confirmPassword" class="block font-semibold"
              >Confirm new Password</label
            >
            <input
              v-model="confirmPassword"
              type="password"
              id="confirmPassword"
              class="block w-full mt-1 text-xl bg-white p-4 border-white rounded-xl shadow mb-4 relative button-hover-effect"
            />
          </div>
          <div>
            <button
              type="submit"
              class="w-full font-semibold mt-4 text-xl text-white py-3 rounded-xl-custom mb-4 button-hover-effect bg-blue"
            >
              Change Password
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import bcrypt from "bcryptjs";
import axios from "axios";
import { mutations } from "../state";

export default defineComponent({
  data() {
    return {
      currentUser: null,
    };
  },
  created() {
    this.currentUser = mutations.getUser();
  },
  setup() {
    const currentPassword = ref<string>("");
    const newPassword = ref<string>("");
    const confirmPassword = ref("");
    const updateSuccess = ref<boolean>(false);
    const updateFailed = ref<boolean>(false);
    const currentUser = mutations.getUser();

    const changePassword = async () => {
      if (newPassword.value !== confirmPassword.value) {
        alert("New passwords do not match");
        return;
      }

      if (!currentUser) {
        alert("User not found");
        return;
      }

      if (typeof currentPassword.value !== "string") {
        alert("Current password is not a valid string");
        return;
      }

      if (typeof currentPassword.value !== "string") {
        alert("Stored password is not a valid string");
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        };

        const requestBody = {
          currentPassword: currentPassword.value,
          newPassword: newPassword.value,
        };

        const response = await axios.put(
          `http://localhost:3000/employee/${currentUser.id}/change-password`,
          requestBody,
          config
        );
        updateSuccess.value = true;
      } catch (error) {
        let errorMessage = "Failed to change password";
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          errorMessage += `: ${error.response.data.error}`;
          alert(errorMessage);
        }
        throw new Error(errorMessage);
        updateFailed.value = true;
      }
    };

    return {
      currentPassword,
      newPassword,
      confirmPassword,
      updateSuccess,
      updateFailed,
      changePassword,
    };
  },
});
</script>
