<template>
  <div class="grid px-4 gap-4 bg-blue-50">
    <div class="col-1">
      <div class="flex align-items-center gap-2">
        <Button icon="pi pi-thumbs-up-fill" rounded text></Button>
        <span>{{ props.data.countVote }}</span>
      </div>
    </div>
    <div class="col">
      <div class="card my-2">
        <Panel>
          <template #footer>
            <div
                class="flex flex-wrap align-items-center justify-content-between gap-3"
            >
              <div class="flex align-items-center gap-2">
                <Avatar
                    image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                    size="small"
                    shape="circle"
                />
                <span class="font-bold">{{ props.data.user.name }}</span>
              </div>
              <span class="p-text-secondary">
                {{ dateFormat(props.data.createdAt) }}
              </span>
            </div>
          </template>
          <div class="mb-3 flex justify-content-end " v-if="authStore.currentUser && authStore.currentUser._id === props.data.user._id">
            <Button icon="pi pi-times" rounded severity="danger" @click="handleDelete(props.data._id)"/>
          </div>
            <span v-html="props.data.answer"></span>
        </Panel>
      </div>
    </div>
  </div>
</template>

<script setup>
import Panel from "primevue/panel";
import Avatar from "primevue/avatar";
import Chip from "primevue/chip";
import {useAuthStore} from "@/stores/authStores.js";
import customFetch from "@/api.js";

const authStore = useAuthStore();

const emit = defineEmits(["reload"]);

const handleDelete = async (paramsId) => {
  try {
    await customFetch.delete(`/answer/${paramsId}`);
    alert("deleted successfully.");

    emit("reload");
  } catch (e) {
    console.info(e);
  }
}

const dateFormat = (dateinput) => {
  const newDate = new Date(dateinput).toLocaleString();

  return newDate;
};

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>
