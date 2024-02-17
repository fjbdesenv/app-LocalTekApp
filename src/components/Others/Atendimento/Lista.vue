<template>
  <table class="table table-hover mt-3">
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
            }"
            >{{ registro.cliente?.razao }}</router-link
          >
        </td>
        <td>{{ registro.status?.descricao }}</td>
        <td class="d-flex justify-content-center">
          <BotoesListaOpcoes
            @deletarRegistro="deletar(registro.codigo ? registro.codigo : 0)"
            :codigo="registro.codigo"
            :rota-editar="rotas.edicao.atendimento"
            :rota-consultar="rotas.consulta.atendimento"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { MixinConfirmacaoDeletar, MixinModuloGet, MixinRoutes } from "@/mixins";
import { Api, Atendimento } from "@/class";
import { PATHS } from "@/enum";
import BotoesListaOpcoes from "@/components/Forms/Buttons/BotoesListaOpcoes.vue";

export default defineComponent({
  name: "ListaAtendimentoComponente",
  data: () => ({
    registros: new Array<Atendimento>(),
  }),
  components: {
    BotoesListaOpcoes,
  },
  mixins: [MixinConfirmacaoDeletar, MixinModuloGet, MixinRoutes],
  methods: {
    getRegitros() {
      const api = new Api();

      while (this.registros.length > 0) this.registros.pop();

      api.atendimento
        .findAll()
        .then((response) => {
          const aux: Array<Atendimento> = response.data;
          aux.forEach((item: Atendimento) => this.registros.push(item));
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
            this.getRegitros();
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
    this.getRegitros();

    /* Adicionando Rotas */
    this.rotas.edicao.atendimento = this.getRouteEdicao(
      this.getModule(),
      PATHS.Atendimento
    );
    this.rotas.edicao.cliente = this.getRouteEdicao(this.getModule(), PATHS.Cliente);
    this.rotas.consulta.atendimento = this.rotas.edicao.atendimento; /* Alterar */
  },
});
</script>
