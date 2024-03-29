<template>
  <table :id="`tabela-${propsTableName}`" class="table table-hover mt-3">
    <thead>
      <tr>
        <th>#</th>
        <th>Data</th>
        <th>Descrição</th>
        <th>Status</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(registro, index) in registros" :key="index">
        <td>{{ registro.codigo }}</td>
        <td>{{ registro.data }}</td>
        <td>{{ registro.descricao }}</td>
        <td>{{ registro.status?.descricao }}</td>
        <td class="d-flex justify-content-center">
          <BotoesListaOpcoes
            @deletarRegistro="deletar(registro.codigo ? registro.codigo : 0)"
            :props-codigo="registro.codigo"
            :props-rota-editar="rotas.edicao.atendimentoEvento"
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
  MixinErro,
  MixinModuloGet,
  MixinRoutes,
  MixinTable,
} from "@/mixins";
import { Api, AtendimentoEvento } from "@/class";
import { PATHS } from "@/enum";
import BotoesListaOpcoes from "@/components/Buttons/BotoesListaOpcoes.vue";

export default defineComponent({
  name: "ListaAtendimentoEventoComponente",
  data: () => ({
    registros: new Array<AtendimentoEvento>(),
  }),
  components: {
    BotoesListaOpcoes,
  },
  mixins: [MixinConfirmacaoDeletar, MixinModuloGet, MixinRoutes, MixinTable, MixinErro],
  methods: {
    getRegistros() {
      const api = new Api();
      const { codigoAtendimento } = this.$route.params;

      /* Atualiza a URL */
      api.atendimentoEventos = api.resourceEvento(+codigoAtendimento);

      while (this.registros.length > 0) this.registros.pop();

      api.atendimentoEventos
        .findAll()
        .then(({ data }) => {
          this.registros = data;
        })
        .catch((error: ErrorEvent) => {
          this.mapeamentoErro(error, 1);
        });
    },

    deletar(codigo: number) {
      if (this.confimacaoDeletar(codigo)) {
        const api = new Api();
        const { codigoAtendimento } = this.$route.params;

        /* Atualiza a URL */
        api.atendimentoEventos = api.resourceEvento(+codigoAtendimento);

        api.atendimentoEventos
          .deleteOne(codigo)
          .then(() => {
            this.getRegistros();
            this.$emit("deletado");
          })
          .catch((error: ErrorEvent) => {
            this.mapeamentoErro(error, 1);
          });
      }
    },
  },
  created() {
    this.getRegistros();

    /* Adicionando Rotas */
    this.rotas.edicao.atendimentoEvento = this.getRouteEdicao(
      this.getModule(),
      PATHS.AtendimentoEvento
    );
  },
});
</script>
