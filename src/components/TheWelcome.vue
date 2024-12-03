<script setup lang="ts">
import WelcomeItem from "./WelcomeItem.vue";
import MassageIcon from "./icons/MassageIcon.vue";
import ScissorIcon from "./icons/ScissorIcon.vue";
import EyebrowIcon from "./icons/EyebrowIcon.vue";
import TreatmentIcon from "./icons/TreatmentIcon.vue";
import BeardIcon from "./icons/BeardIcon.vue";
</script>

<template>
  <div class="homeview">
    <WelcomeItem>
      <template #icon>
        <ScissorIcon />
      </template>
      <template #heading>Corte de Cabelo</template>
      Transforme seu visual com um corte de cabelo estiloso, feito por nossos
      barbeiros experientes. Venha descobrir o estilo que combina com você!
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <BeardIcon />
      </template>
      <template #heading>Barba</template>
      Cuide da sua barba com nossos serviços de aparo e modelagem. Deixe sua
      barba impecável e bem hidratada!
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <TreatmentIcon />
      </template>
      <template #heading>Tratamento Capilar</template>
      Oferecemos tratamentos personalizados para todos os tipos de cabelo.
      Hidratação e nutrição para manter seus fios saudáveis e brilhantes.
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <MassageIcon />
      </template>
      <template #heading>Massagem no Couro Cabeludo</template>
      Relaxe com nossa massagem no couro cabeludo, que estimula a circulação e
      proporciona um momento de tranquilidade e bem-estar.
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <EyebrowIcon />
      </template>
      <template #heading>Design de Sobrancelhas</template>
      Realce seu olhar com nosso serviço de design de sobrancelhas. Modelagem
      precisa para um visual marcante e bem cuidado.
    </WelcomeItem>
  </div>
</template>

<style>
.homeview {
  display: flex; /* Ativa o Flexbox */
  flex-direction: column; /* Organiza os itens em coluna */
  justify-content: center; /* Centraliza verticalmente */
  align-items: center; /* Centraliza horizontalmente */
  min-height: 100vh; /* Garante que a div ocupe toda a altura da tela */
  text-align: left; /* Centraliza o texto dentro dos itens */
  font-size: 15px !important;
}

* {
  color: #ddd;
}

h3 {
  color: hsla(160, 100%, 37%, 1) !important;
}
</style>
