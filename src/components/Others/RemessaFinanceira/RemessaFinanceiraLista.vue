<template>
  <div class="bg-light h-100 m-3 border rounded-3">
    <b-container v-if="!show">
      <router-link :to="{ name: rotaCadatrar }">
        <b-button variant="primary" class="mt-3"> Novo Registro </b-button>
      </router-link>
    </b-container>

    <Lista
      v-show="!show"
      @deletado="MSGdeletado"
      @naoDeletado="MSGnaoDeletado"
      @erro="MSGerrorInternal"
    />

    <div class="d-flex flex-column align-content-center justify-content-center">
      <AlertMessage class="w-50 mt-5" v-if="show" :message="message" :type="type" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BButton, BContainer } from "bootstrap-vue-next";
import AlertMessage from "@/components/Alerts/AlertMessage.vue";
import Lista from "./Lista.vue";
import { MixinMessage } from "@/mixins";

export default defineComponent({
  name: "RemessaFinanceiraLista",
  data: () => ({
    rotaCadatrar: "RemessaRemessaFinanceiraCadastrar",
  }),
  components: {
    AlertMessage,
    Lista,
    BContainer,
    BButton,
  },
  mixins: [MixinMessage],
});
</script>
