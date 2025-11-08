<template>
  <div class="task-list-container">
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">📋 Minhas Tarefas</h2>
        <span class="task-count" v-if="tasks.length">{{ tasks.length }}</span>
      </div>

      <div class="card-body">
        <div v-if="loading" class="loading-state">
          <div class="spinner">⏳</div>
          <p>Carregando tarefas...</p>
        </div>

        <div v-else-if="error" class="alert alert-error">
          ⚠️ {{ error }}
        </div>

        <div v-else-if="!tasks.length" class="empty-state">
          <div class="empty-icon">📝</div>
          <h3>Nenhuma tarefa cadastrada</h3>
          <p>Adicione uma nova tarefa para começar!</p>
        </div>

        <div v-else class="tasks-grid">
          <transition-group name="list">
            <div 
              v-for="task in tasks" 
              :key="task.id" 
              class="task-card"
            >
              <div class="task-content">
                <div class="task-header">
                  <h3 class="task-title">{{ task.title }}</h3>
                  <span class="status-badge" :class="getStatusClass(task.status)">
                    {{ getStatusText(task.status) }}
                  </span>
                </div>
                
                <div class="task-details">
                  <div class="task-info" v-if="task.owner">
                    <span class="info-label">👤 Responsável:</span>
                    <span class="info-value">{{ task.owner }}</span>
                  </div>
                  
                  <div class="task-info" v-if="task.dueDate">
                    <span class="info-label">📅 Prazo:</span>
                    <span class="info-value">{{ formatDate(task.dueDate) }}</span>
                  </div>
                </div>
              </div>

              <button 
                @click="removeTask(task.id)" 
                class="delete-btn"
                title="Remover tarefa"
              >
                🗑️ Excluir
              </button>
            </div>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useTasks } from "~/composables/useTasks";

const { tasks, loadTasks, removeTask, loading, error } = useTasks();

onMounted(loadTasks);

function getStatusClass(status: string) {
  const statusMap: Record<string, string> = {
    'PENDING': 'status-pending',
    'IN_PROGRESS': 'status-progress',
    'COMPLETED': 'status-completed',
    'CANCELLED': 'status-cancelled'
  };
  return statusMap[status] || 'status-pending';
}

function getStatusText(status: string) {
  const statusMap: Record<string, string> = {
    'PENDING': '⏳ Pendente',
    'IN_PROGRESS': '🔄 Em Andamento',
    'COMPLETED': '✓ Concluída',
    'CANCELLED': '✕ Cancelada'
  };
  return statusMap[status] || status;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
</script>

<style scoped>
.task-list-container {
  animation: fadeInRight 0.6s ease;
}

.card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-title {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.task-count {
  background: rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.375rem 0.875rem;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.875rem;
}

.card-body {
  padding: 2rem;
  min-height: 300px;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: #718096;
}

.spinner {
  font-size: 3rem;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  color: #718096;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state h3 {
  color: #4a5568;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: #a0aec0;
}

.tasks-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.task-card {
  background: linear-gradient(135deg, #f6f8fb 0%, #ffffff 100%);
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  transition: all 0.3s ease;
}

.task-card:hover {
  transform: translateX(4px);
  border-color: #667eea;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

.task-content {
  flex: 1;
}

.task-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.task-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.status-badge {
  padding: 0.375rem 0.875rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}

.status-pending {
  background: #fef5e7;
  color: #d68910;
}

.status-progress {
  background: #e3f2fd;
  color: #1976d2;
}

.status-completed {
  background: #e8f5e9;
  color: #388e3c;
}

.status-cancelled {
  background: #ffebee;
  color: #d32f2f;
}

.task-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.task-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.info-label {
  color: #718096;
  font-weight: 500;
}

.info-value {
  color: #2d3748;
  font-weight: 600;
}

.delete-btn {
  background: #fc8181;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(252, 129, 129, 0.3);
}

.delete-btn:hover {
  background: #f56565;
  box-shadow: 0 4px 8px rgba(252, 129, 129, 0.4);
}

.alert {
  padding: 1rem;
  border-radius: 8px;
  font-weight: 500;
}

.alert-error {
  background: #fed7d7;
  color: #c53030;
  border: 1px solid #fc8181;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: transform 0.4s ease;
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
