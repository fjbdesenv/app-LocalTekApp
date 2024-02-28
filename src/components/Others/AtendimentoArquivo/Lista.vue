<template>
  <table :id="`tabela-${propsTableName}`" class="table table-hover mt-3">
    <thead>
      <tr>
        <th>#</th>
        <th>Nome</th>
        <th>Tipo</th>
        <th>Tamanho</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(registro, index) in registros" :key="index">
        <td>{{ registro.codigo }}</td>
        <td>{{ registro.nome }}</td>
        <td>{{ registro.tipo }}</td>
        <td>{{ registro.tamanho }}</td>
        <td class="d-flex justify-content-center">
          <BotoesListaOpcoes
            @deletarRegistro="deletar(registro.codigo ? registro.codigo : 0)"
            :props-codigo="registro.codigo"
            :props-rota-editar="rotas.edicao.atendimentoArquivo"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  MixinConfirmacaoDeletar,
  MixinModuloGet,
  MixinRoutes,
  MixinTable,
} from "@/mixins";
import { Api, AtendimentoArquivo } from "@/class";
import { PATHS } from "@/enum";
import BotoesListaOpcoes from "@/components/Buttons/BotoesListaOpcoes.vue";

export default defineComponent({
  name: "ListaAtendimentoArquivoComponente",
  data: () => ({
    registros: new Array<AtendimentoArquivo>(),
  }),
  components: {
    BotoesListaOpcoes,
  },
  mixins: [MixinConfirmacaoDeletar, MixinModuloGet, MixinRoutes, MixinTable],
  methods: {
    getRegistros() {
      const api = new Api();
      const { codigoAtendimento } = this.$route.params;

      /* Atualiza a URL */
      api.atendimentoArquivos = api.resourceArquivo(+codigoAtendimento);

      while (this.registros.length > 0) this.registros.pop();

      api.atendimentoArquivos
        .findAll()
        .then((response) => {
          this.registros = response.data;
        })
        .catch((error: ErrorEvent) => {
          this.$emit("erro", error);
          console.error(error.message);
        });
    },

    deletar(codigo: number) {
      if (this.confimacaoDeletar(codigo)) {
        const api = new Api();
        const { codigoAtendimento } = this.$route.params;

        /* Atualiza a URL */
        api.atendimentoArquivos = api.resourceArquivo(+codigoAtendimento);

        api.atendimentoArquivos
          .deleteOne(codigo)
          .then(() => {
            this.getRegistros();
            this.$emit("deletado");
          })
          .catch((error: ErrorEvent) => {
            this.$emit("naoDeletado");
            console.error(error.message);
          });
      }
    },
  },
  created() {
    this.getRegistros();

    /* Adicionando Rotas */
    this.rotas.edicao.atendimentoArquivo = this.getRouteEdicao(
      this.getModule(),
      PATHS.AtendimentoArquivo
    );
  },
});
</script>
