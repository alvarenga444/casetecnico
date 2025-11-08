import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Executa antes de todos os testes
beforeAll(async () => {
  // Limpa tabelas principais
  await prisma.notifications.deleteMany({});
  await prisma.tasks.deleteMany({});
});

// Executa depois de todos os testes
afterAll(async () => {
  await prisma.$disconnect();
});
