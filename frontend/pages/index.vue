<template>
  <main>
    <h1>Gerenciador de Tarefas</h1>
    <TaskForm />
    <TaskList />
  </main>
</template>

<script setup lang="ts">
import TaskForm from "~/components/TaskForm.vue";
import TaskList from "~/components/TaskList.vue";
</script>

<style scoped>
main {
  padding: 2rem;
  font-family: sans-serif;
}
</style>
