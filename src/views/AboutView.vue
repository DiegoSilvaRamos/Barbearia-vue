<template>
  <div class="about">

    <p>
      <h1 class="green">
        Sobre
      </h1>

      Fundada em 2002, a Barbearia Fernando começou como um pequeno espaço dedicado à arte da barbearia, com o objetivo
      de oferecer um atendimento acolhedor e de qualidade. Ao longo dos anos, crescemos e expandimos nossos serviços,
      incorporando tratamentos capilares e cuidados especiais, sempre com um olhar atento às tendências de estilo.
      <br>Nossa equipe de barbeiros talentosos se dedica a proporcionar uma experiência personalizada, realçando a beleza e a
      sofisticação de cada cliente.
      <br>Venha nos visitar e descubra como podemos transformar seu visual!
    </p>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    padding: 2rem;
    align-items: center;
    text-align: left;
    font-size: 20px !important;
  }
}

.about {
  display: flex;
  position: relative;
  padding: 1rem;
  line-height: 1.6;
  font-size: 1rem;
}


.about h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.about p {
  margin-bottom: 1rem;
  color: #ddd
}
</style>