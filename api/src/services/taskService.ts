import * as taskRepository from "../repositories/taskRepository";

export async function getAll() {
  return taskRepository.getAll();
}

export async function getById(id: string) {
  return taskRepository.getById(id);
}

export async function create(data: any) {
  if (!data.title || !data.owner || !data.dueDate) {
    throw new Error("Campos obrigatórios: title, owner, dueDate");
  }

  const newTask = await taskRepository.create(data);
  return newTask;
}

export async function update(id: string, data: any) {
  const existing = await taskRepository.getById(id);
  if (!existing) throw new Error("Task não encontrada");

  return taskRepository.update(id, data);
}

export async function remove(id: string) {
  const existing = await taskRepository.getById(id);
  if (!existing) throw new Error("Task não encontrada");

  await taskRepository.remove(id);
  return true;
}
