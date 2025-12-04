import { createRouter, createWebHistory } from "vue-router";

// Importa las vistas
import Portada from "./views/Portada.vue";
import Tablas from "./views/Tablas.vue";

const routes = [
  { path: "/", name: "Portada", component: Portada },
  { path: "/tablas", name: "Tablas", component: Tablas },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
