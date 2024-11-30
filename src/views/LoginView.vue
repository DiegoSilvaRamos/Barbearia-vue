<template>
  <div class="loginview ">
    <form @submit.prevent="loginUser">
      <h1 class="green">Login</h1>
      <div class="wave-group">

        <input type="text" class="input" v-model="loginData.username" required />
        <span class="bar"></span>
        <label class="label">
          <span class="label-char" style="--index: 0">U</span>
          <span class="label-char" style="--index: 1">s</span>
          <span class="label-char" style="--index: 2">u</span>
          <span class="label-char" style="--index: 3">á</span>
          <span class="label-char" style="--index: 4">r</span>
          <span class="label-char" style="--index: 5">i</span>
          <span class="label-char" style="--index: 6">o</span>
        </label>
      </div>

      <div class="wave-group">
        <input type="password" class="input" v-model="loginData.password" required />
        <span class="bar"></span>
        <label class="label">
          <span class="label-char" style="--index: 0">S</span>
          <span class="label-char" style="--index: 1">e</span>
          <span class="label-char" style="--index: 2">n</span>
          <span class="label-char" style="--index: 3">h</span>
          <span class="label-char" style="--index: 4">a</span>
        </label>
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
  display: block;
  /* Use block para ocupar espaço quando visível */
  color: red;
  font-size: 15px;
  letter-spacing: 3px;
  margin-top: 10px;
  /* Adiciona um espaço acima da mensagem */
}
</style>