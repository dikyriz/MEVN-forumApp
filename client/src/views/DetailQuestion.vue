<template>
  <DetailQuestionComponent v-if="questionData" :data="questionData" />
  <LoadingSpinner v-else />
</template>
<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import DetailQuestionComponent from "@/components/Question/DetailQuestionComponent.vue";
import customFetch from "@/api";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const questionData = ref(null);
const route = useRoute();

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
