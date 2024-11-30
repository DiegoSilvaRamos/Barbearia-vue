import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import AgendarView from '../views/AgendarView.vue';
import AgendadosView from '../views/AgendadosView.vue';
import NovoView from '../views/NovoView.vue';
import LoginView from '../views/LoginView.vue';
//import ProtectedView from '../views/ProtectedView.vue'; // Importe a nova view protegida

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/agendar',
      name: 'agendar',
      component: AgendarView,
    },
    {
      path: '/agendados',
      name: 'agendados',
      component: AgendadosView,
    },
    {
      path: '/novo-usuario',
      name: 'novo-usuario',
      component: NovoView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ],
});

export default router;