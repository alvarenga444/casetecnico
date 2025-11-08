# ⚙️ Decisões Técnicas – Backend

## 🧩 1. Arquitetura e Estrutura de Pastas
Optei por uma arquitetura em camadas (Controller → Service → Repository), visando **baixo acoplamento**, **alta manutenibilidade** e **facilidade de testes**.

- **Controller:** responsável apenas por receber as requisições HTTP e retornar as respostas.
- **Service:** contém a lógica de negócio da aplicação.
- **Repository:** camada de acesso a dados, responsável por interagir com o banco via Prisma.

**Benefícios:**
- Facilita testes unitários e de integração.
- Simplifica futuras mudanças no banco ou ORM.
- Segue o princípio da “Single Responsibility”.

```
src/
 ├── controllers/
 ├── services/
 ├── repositories/
 ├── routes/
 ├── utils/
 ├── jobs/
 └── server.ts
```

---

## 🧠 2. ORM e Banco de Dados
Escolhi o **Prisma ORM** com **PostgreSQL** como banco de dados relacional.

**Motivos da escolha:**
- O Prisma oferece **client tipado**, melhorando a segurança e produtividade no TypeScript.
- A modelagem é simples, declarativa e clara (`schema.prisma`).
- As migrações são rastreáveis e consistentes, com versionamento fácil via CLI.

**Modelagem principal:**
```prisma
model tasks {
  id          String   @id @default(uuid())
  title       String
  description String?
  owner       String
  dueDate     DateTime
  status      String   @default("pending")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  notifications notifications[]
}

model notifications {
  id        String   @id @default(uuid())
  taskId    String
  type      String
  createdAt DateTime @default(now())

  task tasks @relation(fields: [taskId], references: [id])
  @@unique([taskId, type])
}
```

---

## 🔁 3. Agendamento e Idempotência
Implementei um **job com `node-cron`** que executa a cada 5 minutos, verificando tarefas próximas do vencimento.

- Cria notificações idempotentes (sem duplicar alertas).
- A idempotência é garantida pela constraint:
  ```prisma
  @@unique([taskId, type])
  ```
- Caso o job seja executado várias vezes, o sistema só cria uma notificação por tarefa.

**Arquivo:** `src/jobs/taskReminderJob.ts`

---

## 🧪 4. Testes Automatizados
Os testes foram escritos com **Jest + Supertest**, cobrindo todos os endpoints e fluxos de erro.

**Principais pontos testados:**
- CRUD completo de tarefas.
- Erros de validação.
- Atualização e exclusão de registros inexistentes.
- Execução dos controladores e tratamento de exceções.

**Cobertura final:**
| Métrica | Valor |
|----------|--------|
| Linhas | **92%** |
| Funções | **94%** |
| Branches | **77%** |
| Testes executados | **9/9 (100%)** |

**Ferramentas:**
- `jest` para execução.
- `supertest` para simular requisições HTTP reais.
- `setupTests.ts` para limpar e desconectar o banco automaticamente.

---

## ⚙️ 5. Tratamento de Erros
Implementei um helper global (`src/utils/errorHandler.ts`) para capturar exceções e retornar respostas padronizadas.

**Exemplo de retorno:**
```json
{
  "message": "Task não encontrada"
}
```

**Benefícios:**
- Padronização das respostas de erro.
- Código mais limpo nos controllers.
- Cobertura total de fluxos de exceção nos testes.

---

## 📜 6. Configuração e Ambiente
- Variáveis sensíveis são gerenciadas via `.env`.
- O Prisma usa `prisma.config.ts` para definir schema, migrations e datasource.
- Scripts configurados no `package.json` para simplificar o fluxo de desenvolvimento:

```json
"scripts": {
  "dev": "ts-node-dev --respawn src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js",
  "test": "jest --runInBand",
  "coverage": "jest --coverage",
  "db:migrate": "npx prisma migrate dev --name init && npx prisma generate"
}
```

---

## 🧩 7. Boas Práticas Aplicadas
- Tipagem estrita com **TypeScript**.
- Organização modular e sem lógica de negócio em controllers.
- Separação clara de responsabilidades.
- Estrutura preparada para futuras features (auth, users, etc.).
- Testes com banco real, garantindo confiabilidade no fluxo de dados.

---

## 🚀 8. Resultado Final
O backend foi desenvolvido com foco em **clareza, testabilidade e manutenção**.  
A arquitetura modular e os testes com alta cobertura garantem **segurança e escalabilidade** para evolução futura do sistema.

**Resumo:**
- Estrutura limpa e extensível.
- Banco seguro e validado por migrações Prisma.
- API REST robusta e coberta por testes automatizados.
- Job agendado e idempotente para notificações.
- Configuração moderna e pronta para produção.

---

✍️ **Autor:** [Francisco Carlos de Alvarenga]  
📅 **Data:** Novembro de 2025  
🏷️ **Desafio Técnico – Desenvolvedor Web Sênior**
