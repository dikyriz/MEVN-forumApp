<template>
  <div class="grid px-4 gap-4 bg-blue-50">
    <div class="col-1">
      <div class="flex justify-content-center align-content-center flex-wrap gap-3" style="min-height: 100%;">
        <Button v-if="votingData && authStore && votingData.user === authStore.currentUser._id" icon="pi pi-thumbs-up-fill" size="large" rounded @click="handleDislike(props.data._id)"></Button>
        <Button v-else icon="pi pi-thumbs-up" size="large" rounded @click="handleLike(props.data._id)"></Button>
        <span class="text-2xl font-bold">{{ props.data.countVote }}</span>
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
                <span class="font-bold">{{ props.data.userId.name }}</span>
              </div>
              <span class="p-text-secondary">
                {{ dateFormat(props.data.createdAt) }}
              </span>
            </div>
          </template>
          <h2 class="text-4xl text-blue-300">{{ props.data.title }}</h2>
          <p class="my-3">
            <span v-html="props.data.question"></span>
          </p>
          <Chip :label="props.data.category" />
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
import {ref, onMounted} from "vue";

const votingData = ref("");

const authStore = useAuthStore();

const detailVote = async () => {
  try {
    const {data} = await customFetch.get(`/voting/${props.data._id}`);
    votingData.value = data.data;
    console.log(data);
  } catch (e) {
    console.info(e);
  }
}

const emit = defineEmits(['reload']);

const handleDislike = async (paramsId) => {
  try {
    await customFetch.delete(`/voting/${paramsId}`);
    emit("reload");
    detailVote();
  } catch (e) {
    alert(e.response.data.message);
  }
}

const handleLike = async (paramsId) => {
  try {
    await customFetch.post(`/voting/${paramsId}`);
    emit("reload");
    detailVote();
  } catch (e) {
    alert(e.response.data.message);
  }
}

onMounted(() => {
  detailVote();
})

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
