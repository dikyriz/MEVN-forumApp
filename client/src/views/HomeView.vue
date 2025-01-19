<template>
  <main>
    <div class="grid">
      <aside class="col-2">
        <div class="p-3 border-round-sm bg-blue-100 ">
          <form @submit.prevent="handleFilter">
            <p class="font-bold">Category</p>
              <div class="flex flex-column gap-2">
                <div v-for="category in categories" :key="category.key" class="flex align-items-center">
                  <RadioButton v-model="selectedCategory" :inputId="category.key" name="category" :value="category.name" />
                  <label :for="category.key" class="ml-2">{{ category.name }}</label>
                </div>
              </div>
            <Divider/>
            <div class="flex my-3">
              <Dropdown v-model="selectedQuestion" :options="questionsFilter" optionLabel="name" option-value="code" placeholder="Filter Question" class="w-full md:w-14rem" />
            </div>
            <Divider/>
            <Button type="submit" label="Filter"/>
          </form>
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
            @reload="allQuestion()"
          />
          <LoadingSpinner v-else />
          <Paginator v-if="questions && questions.length" :rows="5" :totalRecords="totalData" @page="onPage"></Paginator>
          <div v-if="questions && !questions.length">
            <h1>Data Not Found</h1>
          </div>
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
import RadioButton from 'primevue/radiobutton';
import Divider from 'primevue/divider';
import Dropdown from 'primevue/dropdown';
import Paginator from 'primevue/paginator';

const selectedCategory = ref(null);
const categories = ref([
  { name: 'javascript', key: 'JS' },
  { name: 'database', key: 'DB' },
  { name: 'nodejs', key: 'ND' },
  { name: 'vuejs', key: 'VU' }
]);

const selectedQuestion = ref(null);
const questionsFilter = ref([
  { name: 'New Question', code: '-createdAt' },
  { name: 'Old Question', code: 'createdAt' },
  { name: 'A - Z Question', code: 'title' },
]);

const handleFilter = async () => {
  await allQuestion();
}

const onPage = async (e) => {
  await allQuestion(e.page + 1);
}

const questions = ref(null);
const dialog = ref(false);
const authStore = useAuthStore();

const totalData = ref(0);

const allQuestion = async (page = 1) => {
  try {

    const params = {
      sort: selectedQuestion.value,
      category: selectedCategory.value,
      page: page,
    }

    const { data } = await customFetch.get("/question", {params});

    questions.value = data.data;
    totalData.value = data.total;
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
