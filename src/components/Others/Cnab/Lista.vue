<template>
  <table :id="`tabela-${propsTableName}`" class="table table-hover mt-3">
    <thead>
      <tr>
        <th>#</th>
        <th>Descrição</th>
        <th>Quantidade Linhas</th>
        <th>Status</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(registro, index) in registros" :key="index">
        <td>{{ registro.codigo }}</td>
        <td>{{ registro.descricao }}</td>
        <td>{{ registro.quantidade_linhas }}</td>
        <td>{{ registro.status?.descricao }}</td>
        <td class="d-flex justify-content-center">
          <BotoesListaOpcoes
            @deletarRegistro="deletar(registro.codigo ? registro.codigo : 0)"
            :props-codigo="registro.codigo"
            :props-rota-editar="rotas.edicao.cnab"
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
  MixinErro,
} from "@/mixins";
import { Api, Cnab } from "@/class";
import { PATHS } from "@/enum";
import BotoesListaOpcoes from "@/components/Buttons/BotoesListaOpcoes.vue";

export default defineComponent({
  name: "ListaCnabComponente",
  data: () => ({
    registros: new Array<Cnab>(),
  }),
  components: {
    BotoesListaOpcoes,
  },
  mixins: [MixinConfirmacaoDeletar, MixinModuloGet, MixinRoutes, MixinTable, MixinErro],
  methods: {
    getRegistros() {
      const api = new Api();

      while (this.registros.length > 0) this.registros.pop();

      api.cnab
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

        api.cnab
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
    this.path = PATHS.Cnab;
    this.rotas.edicao.cnab = this.getRouteEdicao(this.getModule(), this.path);
  },
});
</script>
