<template>
  <Menubar class="bg-blue-300" :model="items">
    <template #end>
      <Button
        label="Login"
        v-if="!authStore.currentUser"
        icon="pi pi-user"
        @click="dialog = true"
      />
      <div v-else>
        <Button
          label="Dashboard"
          icon="pi pi-home"
          @click="router.push({ name: 'Dashboard' })"
        />
        <Button
          label="Logout"
          class="ml-3"
          severity="danger"
          @click="LogoutUser"
        />
      </div>
    </template>
  </Menubar>

  <!-- dialog -->
  <FormAuthComponent v-model:visible="dialog" />
</template>

<script setup>
import Menubar from "primevue/menubar";
import { ref } from "vue";
import FormAuthComponent from "@/components/FormAuthComponent.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authStores";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

//action
const { LogoutUser } = authStore;

//state
const { dialog } = storeToRefs(authStore);

const items = ref([
  {
    label: "Home",
    icon: "pi pi-home",
    command: () => {
      router.push({ name: "Home" });
    },
  },
  {
    label: "About",
    icon: "pi pi-book",
    command: () => {
      router.push({ name: "About" });
    },
  },
]);
</script>
