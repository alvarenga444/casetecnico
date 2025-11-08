<template>
  <div class="app-container">
    <main class="main-content">
      <div class="header">
        <div class="header-icon">✓</div>
        <h1 class="title">Gerenciador de Tarefas</h1>
        <p class="subtitle">Organize suas atividades de forma simples e eficiente</p>
      </div>
      
      <div class="content-grid">
        <TaskForm />
        <TaskList />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import TaskForm from "~/components/TaskForm.vue";
import TaskList from "~/components/TaskList.vue";
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.main-content {
  width: 100%;
  max-width: 1200px;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  animation: fadeInDown 0.6s ease;
}

.header-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: white;
  border-radius: 16px;
  font-size: 2rem;
  margin-bottom: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.title {
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.subtitle {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .content-grid {
    grid-template-columns: 400px 1fr;
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
