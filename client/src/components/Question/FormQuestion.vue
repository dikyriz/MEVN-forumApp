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
        v-model="question.question"
        editorStyle="height: 320px"
        style="width: 100%"
        placeholder="Insert Your Question"
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
import { ref, reactive, onMounted } from "vue";
import customFetch from "@/api";
import AlertMessage from "../AlertMessage.vue";
import Editor from 'primevue/editor';


const props = defineProps({
  dataQuestion: {
    type: Object,
    required: true,
  },
  isUpdate: {
    type: Boolean,
    default: false,
  },
});


onMounted(() => {
  if (props.dataQuestion && props.isUpdate) {
    console.log(props.dataQuestion);
    question.title = props.dataQuestion.title;
    question.question = props.dataQuestion.question;
    question.category = props.dataQuestion.category;
  }
});

const emit = defineEmits(["close", "reload"]);

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
    if (props.isUpdate) {
      //update data
      await customFetch.put(`/question/${props.dataQuestion._id}`, {
        title: question.title,
        question: question.question,
        category: question.category,
      });
    } else {
      //tambah data
      await customFetch.post("/question", {
        title: question.title,
        question: question.question,
        category: question.category,
      });
    }

    clearInput();
    emit("close");
    emit("reload");
  } catch (error) {
    errorAlert.value = true;
    errorMsg.value = error.response.data.message;
  }
};

const categories = ref(["javascript", "database", "nodejs", "vuejs"]);
</script>
