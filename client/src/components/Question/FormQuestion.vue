<template>
  <form @submit.prevent="handleSubmit">
    <AlertMessage
      v-if="errorAlert"
      :message="errorMsg"
      style="max-width: 100%"
    />
    <div class="flex align-items-center gap-3 mb-3">
      <InputText
        v-model="question.title"
        class="flex-auto"
        placeholder="Insert Question Title"
      />
    </div>
    <div class="flex align-items-center gap-3 mb-5">
      <Editor
        editorStyle="height: 320px"
        style="width: 100%"
        placeholder="Insert Your Question"
        v-model="question.question"
      />
    </div>
    <div class="flex align-items-center gap-3 mb-5">
      <Dropdown
        v-model="question.category"
        :options="categories"
        placeholder="Select a Category Question"
        class="w-full"
      />
    </div>
    <div class="flex justify-content-end gap-2">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="$emit('close')"
      ></Button>
      <Button type="submit" label="Submit"></Button>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive } from "vue";
import customFetch from "@/api";
import AlertMessage from "../AlertMessage.vue";

const emit = defineEmits(["close"]);

//state alert
const errorAlert = ref(false);
const errorMsg = ref();

const question = reactive({
  title: "",
  question: "",
  category: "",
});

const clearInput = () => {
  question.title = "";
  question.question = "";
  question.category = "";
};

const handleSubmit = async () => {
  try {
    const QuestionData = await customFetch.post("/question", {
      title: question.title,
      question: question.question,
      category: question.category,
    });

    if (QuestionData) {
      clearInput();
      emit("close");
      emit("reload");
    }
  } catch (error) {
    errorAlert.value = true;
    errorMsg.value = error.response.data.message;
  }
};

const categories = ref(["javascript", "database", "nodejs", "vuejs"]);
</script>
