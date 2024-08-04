<template>
  <main>
    <div class="grid">
      <aside class="col-2">
        <div class="text-center p-3 border-round-sm bg-blue-100 font-bold">
          Filter
        </div>
      </aside>
      <section class="col">
        <div class="p-3 border-round-sm bg-blue-50">
          <div class="flex justify-content-between align-items-center">
            <h2 class="text-4xl text-primary">List Question</h2>
            <Button
              v-if="authStore.currentUser"
              label="Tambah"
              rounded
              type="button"
              @click="dialog = true"
              icon="pi pi-plus"
            />
          </div>

          <Dialog
            v-model:visible="dialog"
            modal
            header="Create Question"
            :style="{ width: '70%' }"
          >
            <FormQuestion @close="closeDialog()" @reload="allQuestion()" />
          </Dialog>

          <ListQuestion
            v-if="questions"
            v-for="q in questions"
            :key="q.id"
            :data="q"
          />
          <LoadingSpinner v-else />
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import ListQuestion from "@/components/Question/ListQuestion.vue";
import Dialog from "primevue/dialog";
import FormQuestion from "@/components/Question/FormQuestion.vue";
import { ref, onMounted } from "vue";
import customFetch from "@/api";
import { useAuthStore } from "@/stores/authStores";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const questions = ref(null);
const dialog = ref(false);
const authStore = useAuthStore();

const allQuestion = async () => {
  try {
    const { data } = await customFetch.get("/question");
    console.log(data.data);
    questions.value = data.data;
  } catch (error) {
    console.log(error);
  }
};

const closeDialog = () => {
  dialog.value = false;
};

onMounted(() => {
  allQuestion();
});
</script>
