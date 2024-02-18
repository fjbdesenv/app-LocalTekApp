<template>
  <div class="bg-light h-100 m-3 border rounded-3">
    <SubTitle :title="path.replace('aF', 'a F')" />

    <b-container v-if="!show">
      <router-link :to="{ name: rotas.cadastro.remessaFinanceira }">
        <b-button variant="primary" class="mt-3"> Novo Registro </b-button>
      </router-link>
    </b-container>

    <Lista
      v-show="!show"
      @deletado="MSGdeletado"
      @naoDeletado="MSGNaoDeletado"
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
import { MixinMessage, MixinModuloGet, MixinRoutes } from "@/mixins";
import { PATHS } from "@/enum";
import AlertMessage from "@/components/Alerts/AlertMessage.vue";
import SubTitle from "@/components/Titles/SubTitle.vue";
import Lista from "./Lista.vue";

export default defineComponent({
  components: {
    AlertMessage,
    SubTitle,
    Lista,
    BContainer,
    BButton,
  },
  mixins: [MixinMessage, MixinModuloGet, MixinRoutes],
  created() {
    /* Adicionando Rotas */
    this.path = PATHS.RemessaFinanceira;
    this.rotas.cadastro.remessaFinanceira = this.getRouteCadastro(
      this.getModule(),
      this.path
    );
  },
});
</script>
