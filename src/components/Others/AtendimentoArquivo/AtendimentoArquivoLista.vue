<template>
  <div class="bg-light h-100 m-3 border rounded-3">
    <SubTitle :props-title="`Arquivos do Atendimento: ${codigoAtendimento}`" />

    <BotoesListaCabecalho
      :prop-show="show"
      :props-rota-cadastro="rotas.cadastro.atendimentoArquivo"
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
  name: "AtendimentoArquivoLista",
  data: () => ({
    codigoAtendimento: 0,
  }),
  components: {
    BotoesListaCabecalho,
    AlertMessage,
    SubTitle,
    Lista,
  },
  mixins: [MixinMessage, MixinModuloGet, MixinRoutes, MixinPDF],
  created() {
    /* Adicionando Rotas */
    this.path = PATHS.AtendimentoArquivo;
    this.rotas.cadastro.atendimentoArquivo = this.getRouteCadastro(
      this.getModule(),
      this.path
    );
    this.codigoAtendimento = Number(this.$route.params.codigoAtendimento);

    /* Nome de tabela para gerar PDF */
    this.tableName = `Arquivos-Atend-${this.codigoAtendimento}`;
  },
});
</script>
