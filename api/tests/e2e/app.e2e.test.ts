import request from "supertest";
import app from "../../src/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("E2E - Tasks API", () => {
  beforeAll(async () => {
    await prisma.notifications.deleteMany({});
    await prisma.tasks.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("cria e lista uma tarefa (fluxo completo)", async () => {
    // Cria uma tarefa
    const resCreate = await request(app).post("/tasks").send({
      title: "Tarefa E2E",
      owner: "Francisco",
      dueDate: new Date(Date.now() + 1000 * 60 * 60),
    });
    expect(resCreate.status).toBe(201);

    // Lista as tarefas
    const resList = await request(app).get("/tasks");
    expect(resList.status).toBe(200);
    expect(resList.body.length).toBeGreaterThan(0);
    expect(resList.body[0].title).toBe("Tarefa E2E");
  });
});
