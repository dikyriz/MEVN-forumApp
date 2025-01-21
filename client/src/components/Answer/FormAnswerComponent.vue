<template>
  <div class="bg-blue-50 py-3 px-3">
    <form @submit.prevent="handleSubmit">
      <AlertMessage
          v-if="errorAlert"
          :message="errorMsg"
          style="max-width: 100%"
      />
      <div class="flex align-items-center gap-3 mb-5">
        <Editor
            v-model="answer"
            editorStyle="height: 200px"
            style="width: 100%"
            placeholder="Insert Your Answer"
        />
      </div>
      <div class="flex justify-content-end gap-2">
        <Button
            type="button"
            label="Cancel"
            severity="secondary"
            @click="$emit('close')"
        ></Button>
        <Button type="submit" severity="success" label="Answer"></Button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import customFetch from "@/api";
import AlertMessage from "../AlertMessage.vue";
import Editor from 'primevue/editor';


const props = defineProps({
  dataQuestion: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["reload"]);

//state alert
const errorAlert = ref(false);
const errorMsg = ref();

const answer = ref("");

const clearInput = () => {
  answer.value = "";
};

const handleSubmit = async () => {
  try {
      await customFetch.post(`/answer/${props.dataQuestion._id}`, {
        answer: answer.value,
      });

    clearInput();
    emit("reload");
  } catch (error) {
    errorAlert.value = true;
    errorMsg.value = error.response.data.message;
  }
};

</script>
