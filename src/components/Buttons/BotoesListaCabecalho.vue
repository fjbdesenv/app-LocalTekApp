<template>
  <b-container v-if="!propShow">
    <router-link :to="{ name: propsRotaCadastro }">
      <b-button variant="primary" class="m-3"> Novo Registro </b-button>
    </router-link>

    <b-button @click="gerarPDF()" variant="success" class="m-3"> Gerar PDF </b-button>
  </b-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BButton, BContainer } from "bootstrap-vue-next";

export default defineComponent({
  name: "BotoesListaCabecalho",
  props: {
    propShow: {
      type: Boolean,
      required: true,
    },
    propsRotaCadastro: {
      type: String,
      required: true,
    },
  },
  components: {
    BContainer,
    BButton,
  },
  methods: {
    gerarPDF() {
      this.$emit("gerarPDF");
    },
  },
});
</script>
