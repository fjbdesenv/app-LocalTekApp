<template>
  <div class="bg-light h-100 m-3 border rounded-3">
    <SubTitle :props-title="path.replace('a', 'á')" />

    <BotoesListaCabecalho
      :prop-show="show"
      :props-rota-cadastro="rotas.cadastro.usuario"
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
import { MinxinPDF, MixinMessage, MixinModuloGet, MixinRoutes } from "@/mixins";
import BotoesListaCabecalho from "@/components/Buttons/BotoesListaCabecalho.vue";
import AlertMessage from "@/components/Alerts/AlertMessage.vue";
import SubTitle from "@/components/Titles/SubTitle.vue";
import Lista from "./Lista.vue";
import { PATHS } from "@/enum";

export default defineComponent({
  name: "UsuarioLista",
  components: {
    BotoesListaCabecalho,
    AlertMessage,
    SubTitle,
    Lista,
  },
  mixins: [MixinMessage, MixinModuloGet, MixinRoutes, MinxinPDF],
  created() {
    /* Adicionando Rotas */
    this.path = PATHS.Usuario;
    this.rotas.cadastro.usuario = this.getRouteCadastro(this.getModule(), this.path);

    /* Nome de tabela para gerar PDF */
    this.tableName = this.path;
  },
});
</script>
