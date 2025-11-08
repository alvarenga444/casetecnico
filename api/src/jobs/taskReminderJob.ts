import cron from "node-cron";
import { PrismaClient } from "@prisma/client";
import * as taskRepository from "../repositories/taskRepository";

const prisma = new PrismaClient();

// Executa a cada 5 minutos
cron.schedule("*/5 * * * *", async () => {
  console.log("⏰ Verificando tarefas próximas do vencimento...");

  const tasks = await taskRepository.findDueSoon();
  for (const task of tasks) {
    const existing = await prisma.notifications.findUnique({
      where: { taskId_type: { taskId: task.id, type: "DUE_SOON" } },
    });

    if (!existing) {
      await prisma.notifications.create({
        data: { taskId: task.id, type: "DUE_SOON" },
      });
      console.log(`🔔 Notificação criada para ${task.title}`);
    }
  }
});
