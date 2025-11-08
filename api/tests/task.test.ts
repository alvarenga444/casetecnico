import request from "supertest";
import { PrismaClient } from "@prisma/client";
import app from "../src/server"; // ajuste se exportar o app separadamente

const prisma = new PrismaClient();

describe("Task API", () => {
  it("should create a task", async () => {
    const res = await request(app).post("/tasks").send({
      title: "Teste",
      owner: "Francisco",
      dueDate: new Date(Date.now() + 3600000),
    });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Teste");
  });

  it("should get tasks", async () => {
    const res = await request(app).get("/tasks");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
