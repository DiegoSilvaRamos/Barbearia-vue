<template>
  <div class="loginview">
    <form @submit.prevent="loginUser">
      <h1 class="green">Login</h1>
      <div>
        <label for="username">Usuário:</label>
        <input type="text" v-model="loginData.username" required />

        <label for="password">Senha:</label>
        <input type="password" v-model="loginData.password" required />
      </div>

      <div>
        <label for="msg" class="msgResult">{{ message }}</label>
      </div>

      <button class="btn-11" type="submit">Entrar</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter(); 
const loginData = ref({
  username: '',
  password: ''
});
const message = ref('');

// Função para logar o usuário
const loginUser = async () => {
  try {
    console.log('Dados enviados:', {
      username: loginData.value.username,
      password: loginData.value.password,
    });

    const response = await axios.post('http://localhost:3000/api/login', {
      username: loginData.value.username,
      password: loginData.value.password,
    });

    // Armazena o token no localStorage
    localStorage.setItem('token', response.data.token);

    // Atualiza o estado de autenticação
    // Aqui, ao invés de usar router.push, vamos recarregar a página
    window.location.reload(); // Atualiza a página para refletir o estado de autenticação
  } catch (error) {
    console.error('Erro ao logar:', error.response ? error.response.data : error.message);
    message.value = error.response?.data?.message || 'Erro ao logar. Tente novamente.';
  }
};
</script>

<style>
.loginview {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 2rem;
    text-align: left;
    font-size: 20px !important;
}

label {
  margin-top: 15px;
}

input {
  width: 100%;
  padding: 5px;
  border-radius: 5px;
}

button {
  display: flex;
  width: 150px;
  padding: 5px;
  justify-content: center;
  border: 1px solid black;
  margin-top: 50px !important;
  border-radius: 5px;
  box-shadow: 1px 1px 4px #fff;
}

button:hover {
  background-color: hsla(160, 100%, 37%, 1);
  cursor: pointer;
}

.btn-11 {
  border: none;
  background: hsla(160, 100%, 37%, 1);
  background: linear-gradient(0deg, hsla(160, 100%, 37%, 1) 0%, rgb(0, 131, 87) 100%);
  color: #fff;
  overflow: hidden;
}

.btn-11:hover {
  opacity: .7;
}

.msgResult {
  display: block; /* Use block para ocupar espaço quando visível */
  color: red;
  font-size: 15px;
  letter-spacing: 3px;
  margin-top: 10px; /* Adiciona um espaço acima da mensagem */
}
</style>