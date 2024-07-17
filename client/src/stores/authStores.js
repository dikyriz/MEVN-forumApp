import customFetch from "@/api";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("user", () => {
  const dialog = ref(false);
  const errorMsg = ref(null);
  const errorAlert = ref(false);
  const currentUser = ref(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  const router = useRouter();

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

      router.push({ name: "Dashboard" });
    } catch (error) {
      errorAlert.value = true;
      errorMsg.value = error.response.data.message;
    }
  };

  const registerUser = async (inputData) => {
    try {
      const { data } = await customFetch.post("/auth/register", {
        name: inputData.name,
        email: inputData.email,
        password: inputData.password,
      });

      currentUser.value = data.data;
      localStorage.setItem("user", JSON.stringify(data.data));

      console.log(data);
      dialog.value = false;

      router.push({ name: "Dashboard" });
    } catch (error) {
      errorAlert.value = true;
      errorMsg.value = error.response.data.message;
    }
  };

  const LogoutUser = async () => {
    try {
      localStorage.setItem("user", null);
      currentUser.value = null;
      await customFetch("/auth/logout");
      router.push({ name: "home" });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    dialog,
    LoginUser,
    errorAlert,
    errorMsg,
    currentUser,
    LogoutUser,
    registerUser,
  };
});
