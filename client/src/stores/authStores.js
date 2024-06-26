import customFetch from "@/api";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("user", () => {
  const dialog = ref(false);
  const errorMsg = ref(null);
  const errorAlert = ref(false);
  const currentUser = ref(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  const LoginUser = async (inputData) => {
    try {
      const { data } = await customFetch.post("/auth/login", {
        email: inputData.email,
        password: inputData.password,
      });

      currentUser.value = data.data;
      localStorage.setItem("user", JSON.stringify(data.data));

      console.log(data);
      dialog.value = false;
    } catch (error) {
      errorAlert.value = true;
      errorMsg.value = error.response.data.message;
    }
  };

  return { dialog, LoginUser, errorAlert, errorMsg };
});
