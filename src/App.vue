<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'

// Estado reativo da autenticação, iniciado como falso
const isAuthenticated = ref(false);

// Função para verificar a autenticação ao carregar o componente
const checkAuthentication = () => {
  isAuthenticated.value = !!localStorage.getItem('token'); // Atualiza o estado com base na presença do token
};

// Função para logout
const logoutUser = () => {
  localStorage.removeItem('token'); // Remove o token do localStorage
  isAuthenticated.value = false; // Atualiza o estado da autenticação
};

// Chama a função para verificar a autenticação ao carregar o componente
onMounted(() => {
  checkAuthentication();
});
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="150" height="200" />

    <div class="wrapper">
      <h1 class="green">Barbearia Padrinhos</h1>
      <HelloWorld/>

      <nav class="navbar02">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">Sobre</RouterLink>
      </nav>

      <nav class="navbar03" v-if="!isAuthenticated">
        <RouterLink to="/login">Login</RouterLink>
      </nav>
    </div>

    <!-- Navbar exibida apenas quando o usuário estiver autenticado -->
    <nav v-if="isAuthenticated" class="navbar01">
      <RouterLink to="/agendar">Agendar Cliente</RouterLink>
      <RouterLink to="/agendados">Clientes Agendados</RouterLink>
      <RouterLink to="/novo-usuario">Novo Usuário</RouterLink>
      <a @click.prevent="logoutUser" class="logout">Sair</a>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
* {
  text-decoration: none;
}
h1 {
  font-size: 35px;
  font-weight: bold;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;

}

nav a.router-link {
  color: var(  --vt-c-white);
}

nav a.router-link-exact-active  {
  color: var( --vt-c-indigo);
  background-color: var(  --vt-c-text-dark-1);
  font-weight: 800;

}

nav a.router-link-exact-active:hover {
  background-color: transparent;
  color: var(  --vt-c-white);
  cursor: pointer;
}

nav a {
  color:   hsla(160, 100%, 37%, 1);
  display: inline-block;
  padding: 0 1rem;

}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 -50px;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>