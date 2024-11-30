<template>
  <div class="agendarview">
    <form @submit.prevent="addAppointment">
      <h1 class="green">Agendamento de Clientes</h1>

      <div class="wave-group">
        <input type="text" class="input" v-model="newAppointment.name" required />
        <span class="bar"></span>
        <label class="label">
          <span class="label-char" style="--index: 0">N</span>
          <span class="label-char" style="--index: 1">o</span>
          <span class="label-char" style="--index: 2">m</span>
          <span class="label-char" style="--index: 3">e</span>
        </label>
      </div>

      <div class="wave-group">
        <input name="phone" id="phone" type="text" class="input" v-model="newAppointment.phone" @input="formatPhone"
          @keypress="limitPhoneInput" required />
        <span class="bar"></span>
        <label class="label">
          <span class="label-char" style="--index: 0">T</span>
          <span class="label-char" style="--index: 1">e</span>
          <span class="label-char" style="--index: 2">l</span>
          <span class="label-char" style="--index: 3">e</span>
          <span class="label-char" style="--index: 4">f</span>
          <span class="label-char" style="--index: 5">o</span>
          <span class="label-char" style="--index: 6">n</span>
          <span class="label-char" style="--index: 7">e</span>
        </label>
      </div>

      <div class="wave-group">
        <input name="time" id="time" type="text" class="input" v-model="newAppointment.time"
          @input="formattime" required />
        <span class="bar"></span>
        <label for="time" class="label">
          <span class="label-char" style="--index: 0">H</span>
          <span class="label-char" style="--index: 1">o</span>
          <span class="label-char" style="--index: 2">r</span>
          <span class="label-char" style="--index: 3">á</span>
          <span class="label-char" style="--index: 4">r</span>
          <span class="label-char" style="--index: 5">i</span>
          <span class="label-char" style="--index: 6">o</span>
        </label>
      </div>

      <div class="wave-group">
        <select class="input" v-model="newAppointment.service" required>
          <option v-for="service in services" :key="service" :value="service">{{ service }}</option>
        </select>
        <span class="bar"></span>
        <label for="time" class="label">
          <span class="label-char" style="--index: 0">S</span>
          <span class="label-char" style="--index: 1">e</span>
          <span class="label-char" style="--index: 2">r</span>
          <span class="label-char" style="--index: 3">v</span>
          <span class="label-char" style="--index: 4">i</span>
          <span class="label-char" style="--index: 5">ç</span>
          <span class="label-char" style="--index: 6">o</span>
          <span class="label-char" style="--index: 7">s</span>
        </label>

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

// Registra a diretiva de máscara globalmente
const newAppointment = ref({
  name: '',
  phone: '',
  time: '', // Inicialmente vazio
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
    newAppointment.value = { name: '', phone: '', date: '', service: '' }; // Limpa o formulário após o agendamento
  } catch (error) {
    console.error('Erro ao agendar:', error.response ? error.response.data : error.message);
    errorMessage.value = 'Erro ao atualizar agendamento. Tente novamente.';
    successMessage.value = '';
    setTimeout(() => {
      errorMessage.value = '';
    }, 3000); // Exibe mensagem de erro
  }
};

// Limitar a entrada para números
const limitPhoneInput = (event: KeyboardEvent) => {
  const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
  const key = event.key;

  // Permite certas teclas
  if (allowedKeys.includes(key)) {
    return;
  }

  // Permite apenas dígitos
  if (!/[0-9]/.test(key)) {
    event.preventDefault();
  }

  // Limita a entrada a 11 dígitos
  if (newAppointment.value.phone.length >= 15) {
    event.preventDefault();
  }
};

// Limitar a entrada para a data
const limitDateInput = (event: KeyboardEvent) => {
  const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', '/'];
  const key = event.key;

  // Permite certas teclas
  if (allowedKeys.includes(key)) {
    return;
  }

  // Permite apenas dígitos
  if (!/[0-9]/.test(key)) {
    event.preventDefault();
  }

  // Limita a entrada a 16 caracteres (dd/mm/aaaa hh:mm)
  if (newAppointment.value.time.length >= 16) {
    event.preventDefault();
  }
};

// Formatar o telefone
const formatPhone = () => {
  let phone = newAppointment.value.phone.replace(/\D/g, ''); // Remove tudo que não é dígito

  // Limita a 11 dígitos
  if (phone.length > 15) {
    phone = phone.substring(0, 15);
  }

  if (phone.length > 14) {
    phone = phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'); // Formato: (XX) XXXXX-XXXX
  } else if (phone.length > 5) {
    phone = phone.replace(/(\d{2})(\d{5})(\d{1,4})/, '($1) $2-$3'); // Formato: (XX) XXXX-XXXX
  } else if (phone.length > 2) {
    phone = phone.replace(/(\d{2})(\d{1,7})/, '($1) $2'); // Formato: (XX) XXXX
  } else if (phone.length > 0) {
    phone = phone.replace(/(\d+)/, '($1'); // Formato: (X
  }

  newAppointment.value.phone = phone; // Atualiza o valor formatado
};


// Formatar a data e hora
const formattime = () => {
  let time = newAppointment.value.time.replace(/\D/g, ''); // Remove tudo que não é dígito

  // Limita a 14 dígitos (ddmmaaaahhmm)
  if (time.length > 12) {
    time = time.substring(0, 12);
  }

  // Formato: dd/mm/aaaa hh:mm
  if (time.length >= 8) {
    time = time.replace(/(\d{2})(\d{2})(\d{4})(\d{0,2})(\d{0,2})/, '$1/$2/$3 $4:$5'); // Formato: dd/mm/aaaa hh:mm
  } else if (time.length >= 4) {
    time = time.replace(/(\d{2})(\d{0,2})/, '$1/$2'); // Formato: dd/mm
  }

  newAppointment.value.time = time; // Atualiza o valor formatado
};
</script>

<style>
.agendarview {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 2rem;
  text-align: left;
  font-size: 20px !important;
}

option {
  width: 100%;
  padding: 5px;
  border-radius: 5px;
  color: rgb(0, 0, 0);
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

button:hover {
  background-color: hsla(160, 100%, 37%, 1);
  cursor: pointer;
}

button:click {
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

.btn-11:hover {
  opacity: .7;
}

.btn-11:active {
  box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, .3),
    -4px -4px 6px 0 rgba(116, 125, 136, .2),
    inset -4px -4px 6px 0 rgba(255, 255, 255, .2),
    inset 4px 4px 6px 0 rgba(0, 0, 0, .2);
}

input[type="date"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  margin-bottom: 20px;
  background-color: #333333;
  color: white;
}
</style>