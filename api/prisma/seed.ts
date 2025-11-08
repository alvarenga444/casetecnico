import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed do banco...");

  await prisma.notifications.deleteMany({});
  await prisma.tasks.deleteMany({});

  const tasks = await prisma.tasks.createMany({
    data: [
      {
        title: "Finalizar documentação do case técnico",
        description: "Adicionar README e Decisions.md no projeto.",
        owner: "Francisco",
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
        status: "pending",
      },
      {
        title: "Revisar cobertura de testes",
        description: "Verificar branches restantes.",
        owner: "Francisco",
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 48),
        status: "in-progress",
      },
      {
        title: "Enviar projeto no GitHub",
        description: "Fazer push do backend finalizado.",
        owner: "Francisco",
        dueDate: new Date(Date.now() + 1000 * 60 * 60 * 72),
        status: "pending",
      },
    ],
  });

  console.log(`✅ ${tasks.count} tarefas criadas com sucesso.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Erro ao executar seed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
