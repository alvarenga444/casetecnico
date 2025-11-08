<template>
  <div class="task-list">
    <h2>Minhas Tarefas</h2>
    <p v-if="loading">Carregando...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <ul v-if="tasks.length">
      <li v-for="task in tasks" :key="task.id">
        <strong>{{ task.title }}</strong> — {{ task.status }}
        <button @click="removeTask(task.id)">🗑️</button>
      </li>
    </ul>
    <p v-else>Nenhuma tarefa encontrada.</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useTasks } from "~/composables/useTasks";

const { tasks, loadTasks, removeTask, loading, error } = useTasks();

onMounted(loadTasks);
</script>

<style scoped>
.task-list {
  margin-top: 1rem;
}
.error { color: red; }
</style>
