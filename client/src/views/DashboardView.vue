<template>
  <div v-if="user">
    <h1>dashboard</h1>
    <p>{{ user.name }}</p>
  </div>
  <div class="w-full" v-if="authStore.currentUser.role === 'admin'">
    <div class="flex justify-content-center">
      <Panel>
        <h2>Report Question</h2>
        <TableComponent v-if="reports" :data="reports" @reload="getReports" />
      </Panel>
    </div>
  </div>
</template>

<script setup>
import customFetch from "@/api";
import { ref, onMounted } from "vue";
import {useAuthStore} from "@/stores/authStores.js";
import TableComponent from "@/components/TableComponent.vue";
import Panel from "primevue/panel";

const user = ref(null);
const reports = ref(null);
const authStore = useAuthStore();

const getUser = async () => {
  const { data } = await customFetch.get("/auth/getuser");
  // console.log(data);
  user.value = data.user;
};

const getReports = async () => {
  const { data } = await customFetch.get("/report/question");
  console.log(data);
  reports.value = data.data;
}

onMounted(() => {
  getUser();
  if(authStore.currentUser.role === "admin"){
    getReports();
  }
});
</script>
