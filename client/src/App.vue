<template>
  <Header />
</template>

<script setup>
import Header from "@/layouts/Header.vue";
import { onMounted } from "vue";
import customFetch from "./api";

const getData = async () => {
  const res = await customFetch.get("/test");
  console.log(res);
};

onMounted(() => {
  getData();
});
</script>
