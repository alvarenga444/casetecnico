## Arquitetura do Projeto

```mermaid
flowchart TD

subgraph Frontend [Frontend - Nuxt.js]
  UI["Tarefas (Listar/Criar/Editar)"]
  API_Calls["Chamadas HTTP (axios/fetch)"]
  UI --> API_Calls
end

subgraph Backend [Backend - Node.js / Express ou Nuxt Server Routes]
  Controller["Controllers (Rotas REST)"]
  Service["Services (Regras de Negócio)"]
  Repo["Repository (ORM - Prisma)"]
  Job["Job Scheduler (node-cron)"]
end

subgraph Database [Database - PostgreSQL]
  Tasks["Tabela: tasks"]
  Notifications["Tabela: notifications"]
end

UI -->|CRUD Tasks| Controller
API_Calls --> Controller
Controller --> Service
Service --> Repo
Repo -->|CRUD| Tasks
Service -->|Registra logs/alertas| Notifications

Job -->|Consulta tarefas próximas ao vencimento| Tasks
Job -->|Cria alertas (idempotente)| Notifications

Notifications -->|Constraint UNIQUE(task_id, type)| Notifications

style Frontend fill:#C7E8FF,stroke:#333,stroke-width:1px
style Backend fill:#D2FFD0,stroke:#333,stroke-width:1px
style Database fill:#FFE5A5,stroke:#333,stroke-width:1px
