<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <p>
  🎉 Bem-vindo à Barbearia Padrinhos!
  <br>Aqui, transformamos seu visual em uma verdadeira obra-prima.
  
  <br><br>✂️
  Venha relaxar e aproveitar uma experiência única enquanto cuidamos do seu estilo. 
  Pronto para dar o próximo passo e se sentir incrível? 
  Agende sua visita e descubra o que temos de melhor para você!
</p>
  </div>
</template>

<style scoped>
*{
  color: white;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

p {
  font-size: 18px;
  color: #ddd;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
