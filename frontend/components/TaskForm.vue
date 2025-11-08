<template>
  <form @submit.prevent="onSubmit" class="task-form">
    <input v-model="title" type="text" placeholder="Título" required />
    <input v-model="owner" type="text" placeholder="Responsável" required />
    <input v-model="dueDate" type="datetime-local" required />
    <button :disabled="loading" type="submit">Adicionar</button>

    <p v-if="loading">Carregando...</p>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">{{ success }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTasks } from "~/composables/useTasks";

const { createTask, loading, error, success } = useTasks();

const title = ref("");
const owner = ref("");
const dueDate = ref("");

async function onSubmit() {
  await createTask({
    title: title.value,
    owner: owner.value,
    dueDate: new Date(dueDate.value)
  });
  title.value = "";
  owner.value = "";
  dueDate.value = "";
}
</script>

<style scoped>
.task-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 300px;
}
.error { color: red; }
.success { color: green; }
</style>
