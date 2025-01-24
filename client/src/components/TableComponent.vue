<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import customFetch from "@/api.js";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  }
})

const emit = defineEmits(["reload"]);

const deleteQuestion = async (paramsId) => {
  try {
    await customFetch.delete(`/question/${paramsId}`);
    alert("Successfully deleted");
    emit("reload");
  } catch (e) {
    console.error(e);
  }
}
</script>

<template>
  <DataTable :value="props.data" paginator :rows="10" tableStyle="min-width: 50rem">
    <Column field="question.title" sortable header="Question"></Column>
    <Column field="user.name" sortable header="Reported By"></Column>
    <Column field="report" sortable header="Report"></Column>
    <Column style="min-width: 8rem">
      <template #body="slotProps">
        <Button icon="pi pi-trash" outlined rounded severity="danger" @click="deleteQuestion(slotProps.data.question.id)"/>
      </template>
    </Column>
  </DataTable>
</template>

<style scoped>

</style>