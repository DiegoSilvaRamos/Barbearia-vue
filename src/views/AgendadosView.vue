<template>
  <div class="agendadoview">
    <div>
      <h1 class="green">Clientes Agendados</h1>
      <input type="text" v-model="search" placeholder="Buscar por nome ou telefone" />

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

      <table class="table table-dark table-hover table-bordered">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Horário</th>
            <th>Serviço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="appointment in filteredAppointments" :key="appointment.id">
            <td>{{ appointment.name }}</td>
            <td>{{ appointment.phone }}</td>
            <td>{{ formatDateTime(appointment.time) }}</td>
            <td>{{ appointment.service }}</td>
            <td>
              <div class="icones">
                <i class="bi bi-pencil-square" @click="openEditModal(appointment)"></i>
                <i class="bi bi-trash3" @click="deleteAppointment(appointment.id)"></i>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Modal de Edição -->
      <div v-if="isEditModalOpen" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeEditModal">&times;</span>
          <h2>Editar Agendamento</h2>
          <form @submit.prevent="updateAppointment">
            <label for="name">Nome:</label>
            <input type="text" v-model="currentAppointment.name" required />
            <label for="phone">Telefone:</label>
            <input type="text" v-model="currentAppointment.phone" required />
            <label for="time">Horário:</label>
            <input type="datetime-local" v-model="currentAppointment.time" required />
            <label for="service">Serviço:</label>
            <select v-model="currentAppointment.service" required>
              <option v-for="service in services" :key="service" :value="service">{{ service }}</option>
            </select>
            <button class="btn-11" type="submit">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const services = ref(['Corte', 'Barba', 'Tingimento', 'Hidratação']);
const appointments = ref([]);
const search = ref('');
const isEditModalOpen = ref(false);
const currentAppointment = ref({});
const successMessage = ref('');
const errorMessage = ref('');

// Função para buscar todos os agendamentos
const fetchAppointments = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/appointments');
    appointments.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error.response ? error.response.data : error.message);
  }
};

// Computed para filtrar agendamentos com base na busca
const filteredAppointments = computed(() => {
  const lowerCaseSearch = search.value.toLowerCase();
  return appointments.value.filter(appointment => {
    return (
      appointment.name.toLowerCase().includes(lowerCaseSearch) ||
      appointment.phone.includes(lowerCaseSearch)
    );
  });
});

onMounted(fetchAppointments);

// Função para abrir o modal de edição
const openEditModal = (appointment) => {
  currentAppointment.value = { ...appointment };
  isEditModalOpen.value = true;
};

// Função para fechar o modal de edição
const closeEditModal = () => {
  isEditModalOpen.value = false;
};

// Função para atualizar o agendamento
const updateAppointment = async () => {
  try {
    await axios.put(`http://localhost:3000/api/appointments/${currentAppointment.value.id}`, currentAppointment.value);
    await fetchAppointments();
    successMessage.value = 'Agendamento atualizado com sucesso!';
    errorMessage.value = '';
    closeEditModal();
    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error.response ? error.response.data : error.message);
    errorMessage.value = 'Erro ao atualizar agendamento. Tente novamente.';
    successMessage.value = '';
    setTimeout(() => {
      errorMessage.value = '';
    }, 3000);
  }
};

// Função para deletar agendamento
const deleteAppointment = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/api/appointments/${id}`);
    appointments.value = appointments.value.filter(appointment => appointment.id !== id);
    successMessage.value = 'Agendamento deletado com sucesso!';
    errorMessage.value = '';
    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
  } catch (error) {
    console.error('Erro ao deletar agendamento:', error.response ? error.response.data : error.message);
    errorMessage.value = 'Erro ao deletar agendamento. Tente novamente.';
    successMessage.value = '';
    setTimeout(() => {
      errorMessage.value = '';
    }, 3000);
  }
};

// Função para formatar a data/hora
const formatDateTime = (datetime) => {
  const date = new Date(datetime);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} - ${hours}:${minutes}`;
};
</script>

<style>
.agendadoview {
  display: flex;
  min-height: 100vh;
  align-items: center;
  padding: 2rem;
  text-align: left;
  font-size: 15px !important;
}

.table {
  margin-top: 20px;
  position: absolute;
  max-width: 700px;
  border-collapse: separate;
  border-spacing: 0;
  border: 3px solid var(--vt-c-indigo);
  border-radius: 5px;
  overflow: hidden;
}

.table thead th {
  text-align: center;
  background-color: transparent;
  color: hsla(160, 100%, 37%, 1);
  font-weight: bold;
}

.icones {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icones i {
  cursor: pointer;
}

.modal {
  display: flex;
  z-index: 1;
  left: 0;
  top: 0;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
}

.modal-content {
  display: flex;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.452);
  margin: 15% auto;
  padding: 60px;
  border: 1px solid #888;
  width: 500px;
  backdrop-filter: blur(5px);
  justify-content: center;
  align-items: center;
}

label {
  font-size: 18px;
  font-weight: bold;
}

input {
  display: flex;
  border-radius: 5px;
  box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.5);
  width: 350px !important;
  padding-left: 20px !important;
  color: black;
}

.btn-11 {
  border: none;
  background: hsla(160, 100%, 37%, 1);
  background: linear-gradient(0deg, hsla(160, 100%, 37%, 1) 0%, rgb(0, 131, 87) 100%);
  color: #fff;
  overflow: hidden;
  margin: auto;
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

.close {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  margin: 15px;
  color: #00ff15;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.msgAlert{
  position: absolute;
  bottom: 0;
  right: 0;
}

/* Estilos de Transição */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.5s ease;
}

.fade-slide-enter, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>