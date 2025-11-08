import { PrismaClient } from "@prisma/client";
import * as taskRepository from "../src/repositories/taskRepository";

const prisma = new PrismaClient();

describe("Task Repository", () => {
  beforeAll(async () => {
    await prisma.notifications.deleteMany({});
    await prisma.tasks.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("realiza operações CRUD corretamente", async () => {
    // CREATE
    const created = await taskRepository.create({
      title: "Teste CRUD",
      owner: "Francisco",
      dueDate: new Date(Date.now() + 1000 * 60 * 60),
      status: "pending",
      description: "Verificar cobertura do repositório",
    });
    expect(created).toHaveProperty("id");

    // READ (getById)
    const found = await taskRepository.getById(created.id);
    expect(found?.title).toBe("Teste CRUD");

    // UPDATE
    await taskRepository.update(created.id, { status: "done" });
    const updated = await taskRepository.getById(created.id);
    expect(updated?.status).toBe("done");

    // READ ALL (getAll)
    const all = await taskRepository.getAll();
    expect(Array.isArray(all)).toBe(true);
    expect(all.length).toBeGreaterThan(0);

    // DELETE
    await taskRepository.remove(created.id);
    const deleted = await taskRepository.getById(created.id);
    expect(deleted).toBeNull();
  });

  it("busca tarefas próximas do vencimento (findDueSoon)", async () => {
    // cria tarefa com vencimento em 30 minutos
    const task = await taskRepository.create({
      title: "Tarefa próxima do vencimento",
      owner: "Francisco",
      dueDate: new Date(Date.now() + 1000 * 60 * 30),
      status: "pending",
    });

    const dueSoon = await taskRepository.findDueSoon();
    const ids = dueSoon.map((t) => t.id);

    expect(ids).toContain(task.id);

    // limpa o ambiente
    await taskRepository.remove(task.id);
  });
});
