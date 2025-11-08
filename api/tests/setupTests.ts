import { PrismaClient } from "@prisma/client";

// Define NODE_ENV como test para todos os testes
process.env.NODE_ENV = "test";

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
