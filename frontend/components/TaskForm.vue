<template>
  <div class="task-form-container">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">➕ Nova Tarefa</h2>
      </div>
      
      <form @submit.prevent="onSubmit" class="task-form">
        <div class="form-group">
          <label for="title">Título da Tarefa</label>
          <input 
            id="title"
            v-model="title" 
            type="text" 
            placeholder="Ex: Reunião com cliente" 
            required 
          />
        </div>

        <div class="form-group">
          <label for="owner">Responsável</label>
          <input 
            id="owner"
            v-model="owner" 
            type="text" 
            placeholder="Nome do responsável" 
            required 
          />
        </div>

        <div class="form-group">
          <label for="dueDate">Data e Hora</label>
          <input 
            id="dueDate"
            v-model="dueDate" 
            type="datetime-local" 
            required 
          />
        </div>

        <button :disabled="loading" type="submit" class="submit-btn">
          <span v-if="!loading">Adicionar Tarefa</span>
          <span v-else class="loading-spinner">⏳ Adicionando...</span>
        </button>

        <transition name="fade">
          <div v-if="error" class="alert alert-error">
            ⚠️ {{ error }}
          </div>
        </transition>

        <transition name="fade">
          <div v-if="success" class="alert alert-success">
            ✓ {{ success }}
          </div>
        </transition>
      </form>
    </div>
  </div>
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
.task-form-container {
  animation: fadeInLeft 0.6s ease;
}

.card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.card-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1.5rem;
}

.card-title {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.task-form {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #4a5568;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.submit-btn {
  margin-top: 0.5rem;
  font-size: 1rem;
}

.loading-spinner {
  animation: pulse 1.5s ease-in-out infinite;
}

.alert {
  padding: 0.875rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.alert-error {
  background: #fed7d7;
  color: #c53030;
  border: 1px solid #fc8181;
}

.alert-success {
  background: #c6f6d5;
  color: #22543d;
  border: 1px solid #9ae6b4;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}
</style>
