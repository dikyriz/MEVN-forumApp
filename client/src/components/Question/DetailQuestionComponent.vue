<template>
  <div class="grid px-4 gap-4 bg-blue-50">
    <div class="col-2">
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
                <span class="font-bold">Amy Elsner</span>
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
