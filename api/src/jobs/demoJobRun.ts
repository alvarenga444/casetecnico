import { PrismaClient } from "@prisma/client";
import { checkDueTasksAndNotify } from "./taskReminderJob";

const prisma = new PrismaClient();

async function runDemo() {
  console.log("⏰ Iniciando execução manual do job de alerta...");
  await checkDueTasksAndNotify();
  console.log("✅ Execução concluída. Verifique as notificações no banco.");
  await prisma.$disconnect();
}

runDemo().catch(async (e) => {
  console.error("❌ Erro durante o job:", e);
  await prisma.$disconnect();
  process.exit(1);
});