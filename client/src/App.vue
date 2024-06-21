<template>
  <h1>{{ dataM?.message }}</h1>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const dataM = ref(null);

const getData = async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/");
    dataM.value = data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getData();
});
</script>
