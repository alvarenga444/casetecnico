export default defineNuxtConfig({
  typescript: { strict: true },
  app: {
    head: {
      title: "Case Técnico - Tasks",
      meta: [{ name: "description", content: "Gerenciador simples de tarefas com alertas" }]
    }
  },
  css: ["~/assets/global.css"],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || "http://localhost:3000"
    }
  }
});
