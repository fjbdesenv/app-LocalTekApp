<template>
  <div class="bg-light h-100 m-3 border rounded-3">
    <SubTitle :props-title="path" />

    <BotoesListaCabecalho
      :prop-show="show"
      :props-rota-cadastro="rotas.cadastro.banco"
      @gerarPDF="gerarPDF()"
    />

    <Lista
      v-show="!show"
      :props-table-name="tableName"
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
import { MixinMessage, MixinModuloGet, MixinPDF, MixinRoutes } from "@/mixins";
import { PATHS } from "@/enum";
import BotoesListaCabecalho from "@/components/Buttons/BotoesListaCabecalho.vue";
import AlertMessage from "@/components/Alerts/AlertMessage.vue";
import SubTitle from "@/components/Titles/SubTitle.vue";
import Lista from "./Lista.vue";

export default defineComponent({
  name: "BancoLista",
  components: {
    AlertMessage,
    SubTitle,
    Lista,
    BotoesListaCabecalho,
  },
  mixins: [MixinMessage, MixinModuloGet, MixinRoutes, MixinPDF],
  created() {
    /* Adicionando Rotas */
    this.path = PATHS.Banco;
    this.rotas.cadastro.banco = this.getRouteCadastro(this.getModule(), this.path);

    /* Nome de tabela para gerar PDF */
    this.tableName = this.path;
  },
});
</script>
