import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAll() {
  return prisma.tasks.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getById(id: string) {
  return prisma.tasks.findUnique({ where: { id } });
}

export async function create(data: any) {
  return prisma.tasks.create({ data });
}

export async function update(id: string, data: any) {
  return prisma.tasks.update({ where: { id }, data });
}

export async function remove(id: string) {
  return prisma.tasks.delete({ where: { id } });
}

// Usado pelo job para pegar tarefas próximas do vencimento
export async function findDueSoon() {
  const now = new Date();
  const nextHour = new Date(now.getTime() + 60 * 60 * 1000);

  return prisma.tasks.findMany({
    where: {
      dueDate: { lte: nextHour },
      status: "pending",
    },
  });
}
