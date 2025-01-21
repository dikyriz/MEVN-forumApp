<template>
  <DetailQuestionComponent v-if="questionData" :data="questionData" @reload="DetailQuestion()"/>
  <LoadingSpinner v-else />
  <Divider/>
  <h1 class="text-2xl text-primary">List Answers</h1>
  <CardAnswer v-if="questionData" v-for="data in questionData.listAnswer" :data="data" @reload="DetailQuestion()"/>
  <div v-if="questionData && !questionData.listAnswer.length">
    <h1>Belum ada jawaban</h1>
  </div>
  <!--  form answer-->
  <template v-if="authStore.currentUser">
    <Divider/>
    <h1 class="text-3xl text-primary">Answer</h1>
    <FormAnswerComponent @reload="DetailQuestion()" :dataQuestion="questionData"/>
  </template>
</template>
<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import DetailQuestionComponent from "@/components/Question/DetailQuestionComponent.vue";
import customFetch from "@/api";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import Divider from "primevue/divider";
import FormAnswerComponent from "@/components/Answer/FormAnswerComponent.vue";
import {useAuthStore} from "@/stores/authStores.js";
import CardAnswer from "@/components/Answer/CardAnswer.vue";

const questionData = ref(null);
const route = useRoute();

const authStore = useAuthStore();

const DetailQuestion = async () => {
  try {
    const { data } = await customFetch.get(`/question/${route.params.id}`);
    questionData.value = data.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  DetailQuestion();
});
</script>
