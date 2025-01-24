<template>
  <div class="card my-2">
    <Panel>
      <template #header>
        <div class="flex align-items-center gap-2">
          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            size="large"
            shape="circle"
          />
          <span class="font-bold">{{props.data.userId.name}}</span>
        </div>
      </template>
      <template #footer>
        <div
          class="flex flex-wrap align-items-center justify-content-between gap-3"
        >
          <div class="flex align-items-center gap-2">
            <Button icon="pi pi-thumbs-up-fill" rounded text></Button>
            <span>{{ props.data.countVote }}</span>
          </div>
          <span class="p-text-secondary">{{
            dateFormat(props.data.createdAt)
          }}</span>
        </div>
      </template>
      <template #icons>
        <div>
          <Button v-if="authStore.currentUser" class="p-panel-header-icon p-link mr-2" @click="dialogReport(props.data.title, props.data._id)">
            <span class="pi pi-flag"></span>
          </Button>
          <Button v-if="authStore.currentUser && authStore.currentUser._id == props.data.userId._id" class="p-panel-header-icon p-link mr-2" @click="toggle">
            <span class="pi pi-cog"></span>
          </Button>
          <Menu ref="menu" id="config_menu" :model="items" popup />
        </div>
        <Dialog v-model:visible="openReport" modal header="Report Question" :style="{ width: '40%' }">
          <span class="p-text-primary block mb-5">{{titleReport}}</span>
          <form @submit.prevent="handleReport">
              <div class="flex flex-column gap-3">
                <div v-for="report in reports" :key="report.key" class="flex align-items-center">
                  <RadioButton v-model="selectedReport" :inputId="report.key" name="dynamic" :value="report.name" />
                  <label :for="report.key" class="ml-2">{{ report.name }}</label>
                </div>
              </div>
            <div class="flex gap-2">
              <Button type="submit" class="w-full my-5 gap-2" severity="danger" label="Report"></Button>
            </div>
          </form>
        </Dialog>
      </template>
      <RouterLink
        :to="{ name: 'DetailQuestion', params: { id: props.data._id } }"
        class="text-4xl text-primary no-underline"
        >{{ props.data.title }}</RouterLink
      >
      <p class="my-3">
        <span v-html="props.data.question.substring(0, 200)"></span>
      </p>
      <Dialog
        v-model:visible="dialog"
        modal
        header="Update Question"
        :style="{ width: '70%' }"
      >
        <FormQuestion
          @close="dialog = false"
          :dataQuestion="dataQuestion"
          :isUpdate="true"
          @reload="reload()"
        />
      </Dialog>
      <Chip :label="props.data.category" />
    </Panel>
  </div>
</template>

<script setup>
import Panel from "primevue/panel";
import Avatar from "primevue/avatar";
import Chip from "primevue/chip";
import Menu from "primevue/menu";
import Dialog from "primevue/dialog";
import FormQuestion from "./FormQuestion.vue";
import { ref } from "vue";
import {useAuthStore} from "@/stores/authStores.js";
import customFetch from "@/api.js";
import RadioButton from "primevue/radiobutton";


const dialog = ref(false);
const dataQuestion = ref(null);
const menu = ref(null);
const openReport = ref(false);

const titleReport = ref("");
const idReport = ref("");
const selectedReport = ref("spam");
const reports = ref([
  {name: "Spam", key: "A"},
  {name: "Pornografi", key: "B"},
  {name: "Tidak Layak", key: "C"}
])

const toggle = (event) => {
  menu.value.toggle(event);
};

const dialogReport = (title, id) => {
  titleReport.value = title;
  idReport.value = id;
  openReport.value = true;
}

const handleReport = async () => {
  try {
    await customFetch.post(`/report/question/${idReport.value}`, {
      report: selectedReport.value
    });
    openReport.value = false;
    alert("report success");
    emit("reload");
  } catch (e) {
    console.info(e.response.data.message);
  }
}


const emit = defineEmits(["reload"]);
const authStore = useAuthStore();

const reload = () => {
  emit("reload");
};

const items = ref([
  {
    label: "Update",
    icon: "pi pi-refresh",
    command: () => {
      const data = props.data;
      dataQuestion.value = data;
      dialog.value = true;
      // console.log(data);
    },
  },
  {
    label: "Delete",
    icon: "pi pi-times",
    command: async () => {
      await customFetch.delete(`question/${props.data._id}`);
      alert("Delete Success");
      emit("reload");
    },
  },
]);

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
