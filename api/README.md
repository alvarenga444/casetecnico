# 🧠 Case Técnico – Desenvolvedor Backend Sênior

Backend desenvolvido por **Francisco Carlos de Alvarenga**, como parte do desafio técnico **Quero Educação**.

Este projeto implementa uma **API REST** completa para gerenciamento de tarefas, incluindo:
- CRUD completo de *tasks*,
- Job agendado para alertas automáticos,
- Notificações idempotentes,
- Testes automatizados com alta cobertura,
- Seed de dados e scripts padronizados para execução.

---

## 🧩 Arquitetura da Solução

A aplicação segue o padrão **Controller → Service → Repository**, utilizando **Prisma ORM** com **PostgreSQL**.

### 🔷 Diagrama de Arquitetura
![Diagrama](./docs/DiagramaQuero.drawio.png)

> O diagrama ilustra a comunicação entre o Frontend (Nuxt.js), o Backend (Node.js/Express), o Job Scheduler (node-cron) e o Banco PostgreSQL.

---

## ⚙️ Tecnologias Principais

| Categoria | Ferramenta |
|------------|-------------|
| Linguagem | **TypeScript** |
| Framework | **Express.js** |
| ORM | **Prisma** |
| Banco | **PostgreSQL** |
| Testes | **Jest + Supertest** |
| Scheduler | **Node-Cron** |
| Utilitários | **Dotenv**, **CORS** |

---

## 🚀 Execução do Projeto

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/seuusuario/casetecnico.git
cd casetecnico/api
```

### 2️⃣ Instalar dependências
```bash
npm install
```

### 3️⃣ Configurar variáveis de ambiente
Crie um arquivo `.env` na pasta `/api` com o conteúdo:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/casetecnico?schema=public"
```

> Dica: você pode usar um container Docker ou um PostgreSQL local.

### 4️⃣ Rodar as migrações e gerar o client Prisma
```bash
npm run db:migrate
```

### 5️⃣ Popular o banco com dados iniciais (seed)
```bash
npm run db:seed
```

🌱 Isso criará tarefas iniciais no banco de dados.

### 6️⃣ Rodar o servidor
```bash
npm run dev
```

A API estará disponível em:
```
http://localhost:3000
```

---

## 📡 Endpoints Principais

| Método | Rota | Descrição |
|--------|------|------------|
| `GET` | `/tasks` | Lista todas as tarefas |
| `GET` | `/tasks/:id` | Retorna uma tarefa específica |
| `POST` | `/tasks` | Cria uma nova tarefa |
| `PUT` | `/tasks/:id` | Atualiza uma tarefa existente |
| `DELETE` | `/tasks/:id` | Remove uma tarefa |
| `GET` | `/notifications` | (opcional) Lista notificações geradas |

---

## 🔁 Job de Alerta (node-cron)

O job `taskReminderJob.ts` é executado periodicamente e verifica tarefas com *dueDate* próximas do vencimento.

- Cria uma notificação do tipo `"due_soon"` se a tarefa estiver próxima do vencimento.
- Utiliza **idempotência** via constraint `@@unique([taskId, type])` para evitar duplicidade.

### 🧠 Demonstração de Log
```
⏰ Verificando tarefas próximas do vencimento...
✅ Notificação criada para task: Finalizar documentação do case técnico
⚙️ Notificação já existente para task: Revisar cobertura de testes (idempotente)
```

---

## 🧪 Testes Automatizados

Os testes utilizam **Jest + Supertest** e cobrem 100% dos endpoints e fluxos de erro.

| Métrica | Valor |
|----------|--------|
| Linhas | **92%** |
| Funções | **94%** |
| Branches | **77%** |
| Testes executados | **9/9 (100%)** |

### Executar testes
```bash
npm test
```

### Ver cobertura
```bash
npm run coverage
open coverage/lcov-report/index.html
```

---

## 📘 Documentação Técnica

| Documento | Descrição |
|------------|------------|
| [📄 DECISIONS.md](./docs/DECISIONS.md) | Decisões arquiteturais e técnicas do backend |
| [🧱 Diagrama de Arquitetura](./docs/DiagramaQuero.drawio.png) | Estrutura visual da aplicação |

---

## 🧩 Scripts Disponíveis

| Script | Descrição |
|---------|------------|
| `npm run dev` | Inicia o servidor em modo desenvolvimento |
| `npm run build` | Compila o projeto TypeScript para produção |
| `npm start` | Executa o build em produção |
| `npm run db:migrate` | Cria e aplica migrações Prisma |
| `npm run db:seed` | Popula o banco com dados iniciais |
| `npm test` | Executa testes automatizados |
| `npm run coverage` | Gera relatório de cobertura |
| `npm run e2e` | (Opcional) Executa testes E2E |

---

## 🚀 Resultado Final

- Estrutura modular e testável (Controller → Service → Repository)
- Banco relacional PostgreSQL com Prisma ORM
- Job de notificação idempotente com node-cron
- Testes com cobertura superior a 90%
- Documentação completa (`README.md` e `DECISIONS.md`)
- Scripts e seed padronizados para execução local

---

✍️ **Autor:** Francisco Carlos de Alvarenga  
📅 **Data:** Novembro de 2025  
🏷️ **Desafio Técnico – Desenvolvedor Backend Sênior**
