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
          <span class="font-bold">Amy Elsner</span>
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
        <button class="p-panel-header-icon p-link mr-2" @click="toggle">
          <span class="pi pi-cog"></span>
        </button>
        <Menu ref="menu" id="config_menu" :model="items" popup />
      </template>
      <RouterLink
        :to="{ name: 'DetailQuestion', params: { id: props.data._id } }"
        class="text-4xl text-primary no-underline"
        >{{ props.data.title }}</RouterLink
      >
      <p class="my-3">
        <span v-html="props.data.question.substring(0, 200)"></span>
      </p>
      <Chip :label="props.data.category" />
    </Panel>
  </div>
</template>

<script setup>
import Panel from "primevue/panel";
import Avatar from "primevue/avatar";
import Chip from "primevue/chip";
import Menu from "primevue/menu";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const menu = ref(null);
const toggle = (event) => {
  menu.value.toggle(event);
};

const items = ref([
  {
    label: "Update",
    icon: "pi pi-refresh",
    command: () => {
      const data = props.data;
      console.log(data);
    },
  },
  {
    label: "Delete",
    icon: "pi pi-times",
    command: () => {
      console.log("delete");
    },
  },

  {
    separator: true,
  },
  {
    label: "Report",
    icon: "pi pi-flag",
    command: () => {
      console.log("report");
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
