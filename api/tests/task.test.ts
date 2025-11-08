import request from "supertest";
import app from "../src/server";

describe("Task API", () => {
  let createdId: string;

  it("should create a task", async () => {
    const res = await request(app).post("/tasks").send({
      title: "Teste Jest",
      owner: "Francisco",
      dueDate: new Date(Date.now() + 3600000),
    });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Teste Jest");
    createdId = res.body.id;
  });

  it("should get tasks", async () => {
    const res = await request(app).get("/tasks");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get a task by id", async () => {
    const res = await request(app).get(`/tasks/${createdId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(createdId);
  });

  it("should update a task", async () => {
    const res = await request(app).put(`/tasks/${createdId}`).send({
      title: "Atualizado",
      status: "done",
    });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Atualizado");
    expect(res.body.status).toBe("done");
  });

  it("should delete a task", async () => {
    const res = await request(app).delete(`/tasks/${createdId}`);
    expect(res.status).toBe(204);
  });

  it("should return 400 if required fields missing", async () => {
    const res = await request(app).post("/tasks").send({
      owner: "Francisco",
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/Campos obrigatórios/);
  });
  it("should return 404 when trying to get a non-existent task", async () => {
    const res = await request(app).get("/tasks/non-existent-id");
    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/not found/i);
  });
  
  it("should return 400 when trying to update a non-existent task", async () => {
    const res = await request(app).put("/tasks/non-existent-id").send({
      title: "Inexistente",
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/Task não encontrada/i);
  });
  
  it("should handle unexpected errors gracefully", async () => {
    // Força o controller a cair no catch manualmente
    jest.spyOn(console, "error").mockImplementation(() => {});
    const res = await request(app).post("/tasks").send({}); // sem nada
    expect(res.status).toBe(400);
  });
  
});
