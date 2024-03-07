<template>
  <table :id="`tabela-${propsTableName}`" class="table table-hover mt-3">
    <thead>
      <tr>
        <th>#</th>
        <th>Descrição</th>
        <th>Tipo</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(registro, index) in registros" :key="index">
        <td>{{ registro.codigo }}</td>
        <td>{{ registro.descricao }}</td>
        <td>{{ mapeamentoStatusTipo(registro.tipo) }}</td>
        <td class="d-flex justify-content-center">
          <BotoesListaOpcoes
            @deletarRegistro="deletar(registro.codigo ? registro.codigo : 0)"
            :props-codigo="registro.codigo"
            :props-rota-editar="rotas.edicao.status"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  MixinMapStatusTipo,
  MixinConfirmacaoDeletar,
  MixinModuloGet,
  MixinRoutes,
  MixinTable,
} from "@/mixins";
import { Api, Status } from "@/class";
import { PATHS } from "@/enum";
import BotoesListaOpcoes from "@/components/Buttons/BotoesListaOpcoes.vue";

export default defineComponent({
  name: "ListaStatusComponente",
  data: () => ({
    registros: new Array<Status>(),
  }),
  components: {
    BotoesListaOpcoes,
  },
  mixins: [
    MixinMapStatusTipo,
    MixinConfirmacaoDeletar,
    MixinModuloGet,
    MixinRoutes,
    MixinTable,
  ],
  methods: {
    getRegistros() {
      const api = new Api();

      while (this.registros.length > 0) this.registros.pop();

      api.status
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

        api.status
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
    this.path = PATHS.Status;
    this.rotas.edicao.status = this.getRouteEdicao(this.getModule(), this.path);
  },
});
</script>
