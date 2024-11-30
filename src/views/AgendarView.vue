<template>
  <div class="agendarview">
    <form @submit.prevent="addAppointment">
      <h1 class="green">Agendamento de Clientes</h1>
      <div>
        <label for="name">Nome:</label>
        <input type="text" v-model="newAppointment.name" required />

        <label for="phone">Telefone:</label>
        <input type="tel" v-model="newAppointment.phone" required placeholder="(99) 99999-9999" />
      </div>

      <div>
        <label for="time">Horário:</label>
        <input type="datetime-local" v-model="newAppointment.time" required />

        <label for="service">Serviços:</label>
        <select v-model="newAppointment.service" required>
          <option v-for="service in services" :key="service" :value="service">{{ service }}</option>
        </select>
      </div>

      <button class="btn-11" type="submit">Agendar</button>

      <transition name="fade-slide" class="msgAlert">
        <div v-if="successMessage" class="alert alert-success" role="alert">
          {{ successMessage }}
        </div>
      </transition>
      <transition name="fade-slide" class="msgAlert">
        <div v-if="errorMessage" class="alert alert-danger" role="alert">
          {{ errorMessage }}
        </div>
      </transition>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const newAppointment = ref({
  name: '',
  phone: '',
  time: '',
  service: ''
});

const successMessage = ref('');
const errorMessage = ref('');

const services = ref(['Corte', 'Barba', 'Tingimento', 'Hidratação']); // Exemplos de serviços

const addAppointment = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/appointments', newAppointment.value);
    successMessage.value = 'Agendamento atualizado com sucesso!';
    errorMessage.value = '';
    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
    newAppointment.value = { name: '', phone: '', time: '', service: '' }; // Limpa o formulário após o agendamento
  } catch (error) {
    console.error('Erro ao agendar:', error.response ? error.response.data : error.message);
    errorMessage.value = 'Erro ao atualizar agendamento. Tente novamente.';
    successMessage.value = '';
    setTimeout(() => {
      errorMessage.value = '';
    }, 3000);// Exibe mensagem de erro
  }
};
</script>

<style>

.agendarview{
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

input,
select, option {
  width: 100%;
  padding: 5px;
  border-radius: 5px;
  color:black;
}

button {
  display: block;
  width: 150px;
  padding: 5px;
  border: 1px solid black;
  margin-top: 15px !important;
  border-radius: 5px;
  box-shadow: 1px 1px 4px #fff;
}

button:hover{
  background-color: hsla(160, 100%, 37%, 1);
  cursor: pointer;
}

button:click{
  background-color: hsla(160, 100%, 37%, 1);
}


/* 11 */
.btn-11 {
  border: none;
  background: hsla(160, 100%, 37%, 1);
    background: linear-gradient(0deg, hsla(160, 100%, 37%, 1) 0%, rgb(0, 131, 87)100%);
    color: #fff;
    overflow: hidden;
}
.btn-11:hover{
  opacity: .7;
}
.btn-11:active{
  box-shadow:  4px 4px 6px 0 rgba(255,255,255,.3),
              -4px -4px 6px 0 rgba(116, 125, 136, .2), 
    inset -4px -4px 6px 0 rgba(255,255,255,.2),
    inset 4px 4px 6px 0 rgba(0, 0, 0, .2);
}



</style>