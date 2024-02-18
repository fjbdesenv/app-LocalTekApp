<template>
  <table class="table table-hover mt-3">
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
            :codigo="registro.codigo"
            :rota-editar="rotas.edicao.cnab"
            :rota-consultar="rotas.consulta.cnab"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { MixinConfirmacaoDeletar, MixinModuloGet, MixinRoutes } from "@/mixins";
import { Api, Cnab } from "@/class";
import { PATHS } from "@/enum";
import BotoesListaOpcoes from "@/components/Forms/Buttons/BotoesListaOpcoes.vue";

export default defineComponent({
  name: "ListaCnabComponente",
  data: () => ({
    registros: new Array<Cnab>(),
  }),
  components: {
    BotoesListaOpcoes,
  },
  mixins: [MixinConfirmacaoDeletar, MixinModuloGet, MixinRoutes],
  methods: {
    getRegitros() {
      const api = new Api();

      while (this.registros.length > 0) this.registros.pop();

      api.cnab
        .findAll()
        .then((response) => {
          const aux: Array<Cnab> = response.data;
          aux.forEach((item: Cnab) => this.registros.push(item));
        })
        .catch((error: ErrorEvent) => {
          this.$emit("erro", error);
          console.error(error.message);
        });
    },

    deletar(codigo: number) {
      if (this.confimacaoDeletar(codigo)) {
        const api = new Api();

        api.cnab
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
    this.path = PATHS.Cnab;
    this.rotas.edicao.cnab = this.getRouteEdicao(this.getModule(), this.path);
    this.rotas.consulta.cnab = this.rotas.edicao.cnab; /* Alterar */
  },
});
</script>
