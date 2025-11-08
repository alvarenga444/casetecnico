import axios from "axios";
// Remove usage of useRuntimeConfig for improved module compatibility

const apiBase = process.env.API_BASE || "http://localhost:3333";
const api = axios.create({ baseURL: apiBase });

export function useTasks() {

  const loading = ref(false);
  const error = ref<string | null>(null);
  const success = ref<string | null>(null);
  const tasks = ref<any[]>([]);

  async function loadTasks() {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await api.get("/tasks");
      tasks.value = data;
    } catch (err: any) {
      error.value = "Erro ao carregar tarefas";
    } finally {
      loading.value = false;
    }
  }

  async function createTask(task: any) {
    loading.value = true;
    error.value = null;
    success.value = null;
    try {
      await api.post("/tasks", task);
      success.value = "Tarefa criada com sucesso!";
      await loadTasks();
    } catch (err: any) {
      error.value = err.response?.data?.message || "Erro ao criar tarefa";
    } finally {
      loading.value = false;
    }
  }

  async function removeTask(id: string) {
    loading.value = true;
    error.value = null;
    success.value = null;
    try {
      await api.delete(`/tasks/${id}`);
      success.value = "Tarefa removida com sucesso!";
      await loadTasks();
    } catch (err: any) {
      error.value = "Erro ao remover tarefa";
    } finally {
      loading.value = false;
    }
  }

  return { tasks, loading, error, success, loadTasks, createTask, removeTask };
}
