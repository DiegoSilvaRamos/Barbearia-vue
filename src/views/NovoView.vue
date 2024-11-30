<template>
  <div class="novoview">
    <form @submit.prevent="createUser">
      <h1 class="green">Criar Novo Usuário</h1>
      <div>
        <label for="username">Nome do Usuário:</label>
        <input type="text" v-model="newUser.username" required />

        <label for="password">Senha:</label>
        <input type="password" v-model="newUser.password" required />
      </div>

      <div>
        <label for="msg" class="msgResult">{{ message }}</label>
      </div>

      <button class="btn-11" type="submit">Criar</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios'; // Importando Axios

const newUser = ref({
  username: '',
  password: ''
});
const message = ref(''); // Mensagem para feedback ao usuário

// Função para criar um novo usuário
const createUser = async () => {
  try {
    console.log('Dados enviados:', {
      username: newUser.value.username,
      password: newUser.value.password,
    });

    const response = await axios.post('http://localhost:3000/api/register', {
      username: newUser.value.username,
      password: newUser.value.password,
    });

    message.value = response.data.message; // Mensagem de sucesso
    newUser.value = { username: '', password: '' }; // Limpa o formulário após a criação
  } catch (error) {
    console.error('Erro ao criar usuário:', error.response ? error.response.data : error.message); // Log de erro no console
    message.value = error.response?.data?.message || 'Erro ao criar usuário. Tente novamente.'; // Mensagem de erro
  }
};
</script>


<style>
.novoview {
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
  display: block;
  /* Use block para ocupar espaço quando visível */
  color: red;
  font-size: 15px;
  letter-spacing: 3px;
  margin-top: 10px;
  /* Adiciona um espaço acima da mensagem */
}
</style>