import { PrismaClient } from "@prisma/client";
import { checkDueTasksAndNotify } from "../src/jobs/taskReminderJob";
import * as cron from "node-cron";

const prisma = new PrismaClient();

describe("Job de Alerta (idempotência)", () => {
  beforeAll(async () => {
    await prisma.notifications.deleteMany({});
    await prisma.tasks.deleteMany({});
    await prisma.tasks.create({
      data: {
        title: "Teste Job",
        owner: "Francisco",
        dueDate: new Date(Date.now() + 1000 * 60 * 30),
        status: "pending",
      },
    });
  });

  afterAll(async () => {
    await prisma.notifications.deleteMany({});
    await prisma.tasks.deleteMany({});
    await prisma.$disconnect();
  });

  it("cria notificação apenas uma vez em execuções repetidas", async () => {
    await checkDueTasksAndNotify();
    const firstCount = await prisma.notifications.count();
    await checkDueTasksAndNotify();
    const secondCount = await prisma.notifications.count();

    expect(firstCount).toBeGreaterThan(0);
    expect(secondCount).toBe(firstCount);
  });

  it("agenda o cron corretamente em ambiente de produção", async () => {
    const scheduleSpy = jest.spyOn(cron, "schedule").mockImplementation(() => ({
      start: jest.fn(),
      stop: jest.fn(),
    }) as any);

    process.env.NODE_ENV = "production";
    const job = await import("../src/jobs/taskReminderJob");
    expect(scheduleSpy).toHaveBeenCalledTimes(1);

    scheduleSpy.mockRestore();
  });
});
