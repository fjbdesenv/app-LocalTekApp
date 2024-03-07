<template>
  <table :id="`tabela-${propsTableName}`" class="table table-hover mt-3">
    <thead>
      <tr>
        <th>#</th>
        <th>Cód. Atend. Tek-System</th>
        <th>Cliente</th>
        <th>Status</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(registro, index) in registros" :key="index">
        <td>{{ registro.codigo }}</td>
        <td>{{ registro.codigo_atendimento_tek }}</td>
        <td>
          <router-link
            :to="{
              name: rotas.edicao.cliente,
              params: { codigo: registro.codigo_cliente },
              query: { returnList: 'false' },
            }"
            >{{ registro.cliente?.razao }}</router-link
          >
        </td>
        <td>{{ registro.status?.descricao }}</td>
        <td class="d-flex justify-content-center">
          <BotoesListaAtendimento
            :propscodigo-atendimento="registro.codigo ? registro.codigo : 0"
            :props-rota-evento="rotas.lista.atendimentoEvento"
            :props-rota-arquivo="rotas.lista.atendimentoArquivo"
          />
          <BotoesListaOpcoes
            @deletarRegistro="deletar(registro.codigo ? registro.codigo : 0)"
            :props-codigo="registro.codigo ? registro.codigo : 0"
            :props-rota-editar="rotas.edicao.atendimento"
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
import { Api, Atendimento } from "@/class";
import { PATHS } from "@/enum";
import BotoesListaAtendimento from "@/components/Buttons/BotoesListaAtendimento.vue";
import BotoesListaOpcoes from "@/components/Buttons/BotoesListaOpcoes.vue";

export default defineComponent({
  name: "ListaAtendimentoComponente",
  data: () => ({
    registros: new Array<Atendimento>(),
  }),
  components: {
    BotoesListaAtendimento,
    BotoesListaOpcoes,
  },
  mixins: [MixinConfirmacaoDeletar, MixinModuloGet, MixinRoutes, MixinTable],
  methods: {
    getRegistros() {
      const api = new Api();

      while (this.registros.length > 0) this.registros.pop();

      api.atendimento
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

        api.atendimento
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
    this.rotas.edicao.atendimento = this.getRouteEdicao(
      this.getModule(),
      PATHS.Atendimento
    );
    this.rotas.edicao.cliente = this.getRouteEdicao(this.getModule(), PATHS.Cliente);
    this.rotas.lista.atendimentoEvento = this.getRouteLista(
      this.getModule(),
      PATHS.AtendimentoEvento
    );
    this.rotas.lista.atendimentoArquivo = this.getRouteLista(
      this.getModule(),
      PATHS.AtendimentoArquivo
    );
  },
});
</script>
