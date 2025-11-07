### 📘 Arquitetura do Projeto

O sistema foi desenvolvido seguindo uma arquitetura em camadas, separando responsabilidades entre **Frontend**, **Backend** e **Banco de Dados**.

O **Frontend (Nuxt.js)** é responsável pela interface do usuário, onde é possível criar, listar e editar tarefas.  
As requisições são enviadas via **HTTP (Axios ou Fetch)** para o **Backend (Node.js + Express)**, que processa as rotas REST através de **Controllers**, delegando a lógica de negócio para os **Services**.

Os **Services** comunicam-se com o **Repository**, implementado com **Prisma ORM**, responsável pelas operações de leitura e escrita no **PostgreSQL**.

Um **Job Scheduler (node-cron)** executa periodicamente (por exemplo, a cada 5 minutos) um processo que:
- Busca tarefas próximas do vencimento;  
- Cria alertas de notificação de forma **idempotente**, garantindo que não ocorram duplicações (via constraint `UNIQUE(task_id, type)` na tabela `notifications`).

Essa abordagem promove **clareza, isolamento de responsabilidades** e **facilidade de manutenção**, além de garantir **consistência e confiabilidade** no envio de notificações.
