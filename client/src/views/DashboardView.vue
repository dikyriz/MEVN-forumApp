<template>
  <div v-if="user">
    <h1>dashboard</h1>
    <p>{{ user.name }}</p>
  </div>
</template>

<script setup>
import customFetch from "@/api";
import { ref, onMounted } from "vue";

const user = ref(null);

const getUser = async () => {
  const { data } = await customFetch.get("/auth/getuser");
  console.log(data);
  user.value = data.user;
};

onMounted(() => {
  getUser();
});
</script>
