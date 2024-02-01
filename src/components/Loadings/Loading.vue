<template>
  <b-row>
    <b-col md="6" class="mb-3 p-5">
      <b-container class="d-flex flex-column align-items-center ">
        <p v-text="text"></p>
        <BIconArrowClockwise id="icon-loading" />
      </b-container>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { BContainer, BRow, BCol } from "bootstrap-vue-next";
import { BIconArrowClockwise } from "bootstrap-icons-vue";

export default defineComponent({
  name: 'LoadingLogin',
  data: () => ({
    form: {
      email: '',
      senha: ''
    },
    loggingIn: false,
    text: 'Carregando'
  }),
  components: {
    BIconArrowClockwise,
    BContainer,
    BRow,
    BCol
  },
  beforeCreate() {
    let count = 0;

    setInterval(() => {

      count++;

      if (count > 3) {
        this.text = 'Carregando';
        count = 0;
      } else {
        this.text += '.';
      }
    }, 1000)
  }
});
</script>

<style scoped>
#icon-loading {
  margin: 1rem;
  font-size: 6rem;
  color: cadetblue;

  animation: transform-icon 1.5s infinite linear;
  display: inline-block;
}

@keyframes transform-icon {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(359deg);
  }
}
</style>
