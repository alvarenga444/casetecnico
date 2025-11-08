# 📋 Gerenciador de Tarefas - Frontend

![Nuxt.js](https://img.shields.io/badge/Nuxt-3.12.0-00DC82?style=flat&logo=nuxt.js&logoColor=white)
![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=flat&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-3178C6?style=flat&logo=typescript&logoColor=white)

Aplicação web moderna para gerenciamento de tarefas, construída com Nuxt 3, Vue 3 e TypeScript. Interface intuitiva e responsiva para organizar suas atividades de forma simples e eficiente.

## ✨ Funcionalidades

- ✅ **Criar tarefas** com título, responsável e prazo
- 📋 **Listar tarefas** com visualização em cards elegantes
- 🗑️ **Excluir tarefas** com um clique
- 🎨 **Interface moderna** com gradientes e animações suaves
- 📱 **Design responsivo** que se adapta a qualquer tela
- 🏷️ **Status coloridos** para identificação visual rápida
- ⏱️ **Feedback em tempo real** de carregamento e ações
- 🎯 **Estados vazios** informativos e amigáveis

## 🚀 Tecnologias Utilizadas

- **[Nuxt 3](https://nuxt.com/)** - Framework Vue.js de última geração
- **[Vue 3](https://vuejs.org/)** - Framework progressivo JavaScript
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript com tipagem estática
- **[Axios](https://axios-http.com/)** - Cliente HTTP para requisições à API
- **CSS3** - Estilização moderna com gradientes, animações e transições

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- **Node.js** (versão 18 ou superior) - [Download](https://nodejs.org/)
- **npm** ou **yarn** (gerenciador de pacotes)
- **API Backend** rodando (veja o README da API)

## 🔧 Instalação

1. **Clone o repositório** (se ainda não fez):

```bash
git clone <url-do-repositorio>
cd casetecnico/frontend
```

2. **Instale as dependências**:

```bash
npm install
```

ou com yarn:

```bash
yarn install
```

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do diretório `frontend` (opcional):

```env
API_BASE_URL=http://localhost:3333
```

Por padrão, a aplicação tentará se conectar à API em `http://localhost:3333`.

## 🏃‍♂️ Como Executar

### Modo Desenvolvimento

Inicie o servidor de desenvolvimento com hot-reload:

```bash
npm run dev
```

A aplicação estará disponível em: **http://localhost:3000**

### Modo Produção

1. **Build da aplicação**:

```bash
npm run build
```

2. **Inicie o servidor de produção**:

```bash
npm run start
```

## 📁 Estrutura do Projeto

```
frontend/
├── assets/
│   └── global.css          # Estilos globais da aplicação
├── components/
│   ├── TaskForm.vue        # Formulário de criação de tarefas
│   └── TaskList.vue        # Lista de tarefas com cards
├── composables/
│   └── useTasks.ts         # Lógica reutilizável para gerenciar tarefas
├── pages/
│   └── index.vue           # Página principal da aplicação
├── nuxt.config.ts          # Configurações do Nuxt
├── package.json            # Dependências e scripts
├── tsconfig.json           # Configurações do TypeScript
└── README.md               # Este arquivo
```

## 🎨 Componentes Principais

### TaskForm.vue
Formulário para criar novas tarefas com:
- Campo de título
- Campo de responsável
- Seletor de data/hora
- Feedback visual de sucesso/erro
- Validação de campos obrigatórios

### TaskList.vue
Lista todas as tarefas cadastradas com:
- Cards individuais para cada tarefa
- Badges coloridos de status
- Informações de responsável e prazo
- Botão de exclusão
- Estados de loading e vazio

### useTasks (Composable)
Composable Vue 3 que encapsula toda a lógica de:
- Comunicação com a API
- Gerenciamento de estado (loading, error, success)
- CRUD de tarefas
- Tratamento de erros

## 🎯 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Cria build de produção |
| `npm run start` | Inicia servidor de produção |

## 🐛 Troubleshooting

### Erro de conexão com a API

Se você ver erros de conexão, verifique:

1. A API backend está rodando?
2. A URL da API está correta no arquivo `.env` ou no `nuxt.config.ts`?
3. A porta está correta? (padrão: 3333 para API)

### Porta 3000 já está em uso

Se a porta 3000 já estiver em uso, você pode especificar outra porta:

```bash
PORT=3001 npm run dev
```

### Problemas com node_modules

Se houver problemas com as dependências:

```bash
# Remova node_modules e package-lock.json
rm -rf node_modules package-lock.json

# Reinstale as dependências
npm install
```

## 🎨 Personalização

### Cores e Temas

As cores principais podem ser alteradas no arquivo `assets/global.css`:

```css
/* Gradiente principal */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Cores dos botões */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Animações

As animações podem ser ajustadas nos arquivos `.vue` individuais na seção `<style scoped>`.

## 📱 Responsividade

A aplicação é totalmente responsiva e se adapta a:
- 📱 Mobile (< 768px)
- 💻 Tablet (768px - 1024px)
- 🖥️ Desktop (> 1024px)

## 🔗 Integração com a API

A aplicação se comunica com a API através do composable `useTasks.ts`, que utiliza Axios para fazer requisições HTTP.

**Endpoints utilizados:**
- `GET /tasks` - Lista todas as tarefas
- `POST /tasks` - Cria uma nova tarefa
- `DELETE /tasks/:id` - Remove uma tarefa

## 📝 Próximos Passos

Possíveis melhorias futuras:
- [ ] Edição de tarefas existentes
- [ ] Filtros por status
- [ ] Ordenação customizável
- [ ] Busca de tarefas
- [ ] Paginação
- [ ] Notificações push
- [ ] Modo escuro
- [ ] Drag and drop para reordenar

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um Pull Request

## 📄 Licença

Este projeto é parte de um case técnico.

## 👨‍💻 Autor

Desenvolvido com ❤️ para demonstrar habilidades em desenvolvimento frontend moderno.

---

**Dúvidas?** Abra uma issue ou entre em contato!

