<template>
  <div class="flex flex-col items-center w-full space-y-4">
    <form @submit.prevent="login">
      <div>
        <label for="currentPassword" class="block font-semibold">
          Personal ID
        </label>
        <input
          type="text"
          v-model="personalId"
          placeholder="Personal ID"
          required
          autocomplete="off"
          class="w-full mt-1 text-xl bg-white p-4 border-white rounded-xl shadow mb-4"
        />
      </div>
      <div>
        <label for="currentPassword" class="block font-semibold">
          Password
        </label>
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          required
          autocomplete="off"
          class="w-full mt-1 text-xl bg-white p-4 border-white rounded-xl shadow mb-4"
        />
      </div>
      <button
        class="w-full bg-blue-500 font-semibold mt-4 text-xl text-white bg-blue py-3 rounded-xl-custom"
      >
        Login
      </button>
    </form>
    <div v-if="error" class="mt-4 text-red-500">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "../services/axios";
import { mutations } from "../state";

export default defineComponent({
  name: "Login",
  setup() {
    const router = useRouter();

    const personalId = ref("");
    const password = ref("");
    const error = ref("");

    const login = async () => {
      try {
        const response = await axios.post("http://localhost:3000/login", {
          personalId: personalId.value,
          password: password.value,
        });
        const data = response.data;
        //console.log("Login response data:", data);

        if (data.currEmployee && data.currEmployee.token) {
          error.value = "";
          console.log("Login successful");
          mutations.setUser(data.currEmployee);
          localStorage.setItem("token", data.currEmployee.token);
          // redirect to main page
          router.push("/main");
        } else {
          error.value = "Invalid personal ID or password";
        }
      } catch (err) {
        error.value = "Error logging in";
        console.error("Error:", err);
      }
    };

    return {
      personalId,
      password,
      login,
      error,
    };
  },
});
</script>
