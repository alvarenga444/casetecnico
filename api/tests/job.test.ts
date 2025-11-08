import { PrismaClient } from "@prisma/client";
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
    // Importa a função dinamicamente para evitar importação no top-level
    const { checkDueTasksAndNotify } = await import("../src/jobs/taskReminderJob");
    
    await checkDueTasksAndNotify();
    const firstCount = await prisma.notifications.count();
    await checkDueTasksAndNotify();
    const secondCount = await prisma.notifications.count();

    expect(firstCount).toBeGreaterThan(0);
    expect(secondCount).toBe(firstCount);
  });

  it("agenda o cron corretamente em ambiente de produção", async () => {
    // Salva o NODE_ENV original
    const originalNodeEnv = process.env.NODE_ENV;
    
    // Limpa o cache do módulo ANTES de mudar o NODE_ENV
    jest.resetModules();
    
    // Define como production
    process.env.NODE_ENV = "production";
    
    // Mock do node-cron ANTES de importar o módulo
    jest.doMock("node-cron", () => ({
      schedule: jest.fn().mockReturnValue({
        start: jest.fn(),
        stop: jest.fn(),
      }),
    }));
  
    // Importa o módulo COM NODE_ENV=production
    const taskReminderModule = await import("../src/jobs/taskReminderJob");
    const cronMock = await import("node-cron");
  
    expect(cronMock.schedule).toHaveBeenCalledTimes(1);
    expect(cronMock.schedule).toHaveBeenCalledWith("*/5 * * * *", expect.any(Function));
  
    // Limpa e restaura
    process.env.NODE_ENV = originalNodeEnv;
    jest.dontMock("node-cron");
    jest.resetModules();
  });
});
