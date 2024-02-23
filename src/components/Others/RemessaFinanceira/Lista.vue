<template>
  <table :id="`tabela-${propsTableName}`" class="table table-hover mt-3">
    <thead>
      <tr>
        <th>#</th>
        <th>Atend.</th>
        <th>Banco</th>
        <th>Cnab</th>
        <th>Titular</th>
        <th>Sacador/Avalista</th>
        <th>Status</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(registro, index) in registros" :key="index">
        <td>{{ registro.codigo }}</td>

        <td>
          <router-link
            :to="{
              name: rotas.edicao.atendimento,
              params: { codigo: registro.codigo_atendimento },
              query: { returnList: 'false' },
            }"
          >
            {{ registro.atendimento?.codigo_atendimento_tek }}
          </router-link>
        </td>

        <td>
          <router-link
            :to="{
              name: rotas.edicao.banco,
              params: { codigo: registro.codigo_banco },
              query: { returnList: 'false' },
            }"
          >
            {{ registro.banco?.nome }}
          </router-link>
        </td>

        <td>
          <router-link
            :to="{
              name: rotas.edicao.cnab,
              params: { codigo: registro.codigo_cnab },
              query: { returnList: 'false' },
            }"
          >
            {{ registro.cnab?.descricao }}
          </router-link>
        </td>

        <td>
          {{ registro.titular }}
        </td>

        <td>
          {{ registro.sacador_avalista }}
        </td>
        <td>{{ registro.status?.descricao }}</td>
        <td class="d-flex justify-content-center">
          <BotoesListaOpcoes
            @deletarRegistro="deletar(registro.codigo ? registro.codigo : 0)"
            :props-codigo="registro.codigo"
            :props-rota-editar="rotas.edicao.remessaFinanceira"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { MixinConfirmacaoDeletar, MixinModuloGet, MixinRoutes } from "@/mixins";
import { Api, RemessaFinanceira } from "@/class";
import { PATHS } from "@/enum";
import BotoesListaOpcoes from "@/components/Buttons/BotoesListaOpcoes.vue";

export default defineComponent({
  name: "ListaRemessaFinanceiraComponente",
  data: () => ({
    registros: new Array<RemessaFinanceira>(),
  }),
  props: {
    propsTableName: {
      type: String,
      required: true,
    },
  },
  components: {
    BotoesListaOpcoes,
  },
  mixins: [MixinConfirmacaoDeletar, MixinModuloGet, MixinRoutes],
  methods: {
    getRegitros() {
      const api = new Api();

      while (this.registros.length > 0) this.registros.pop();

      api.remessafinanceira
        .findAll()
        .then((response) => {
          const aux: Array<RemessaFinanceira> = response.data;
          aux.forEach((item: RemessaFinanceira) => this.registros.push(item));
        })
        .catch((error: ErrorEvent) => {
          this.$emit("erro", error);
          console.error(error.message);
        });
    },

    deletar(codigo: number) {
      if (this.confimacaoDeletar(codigo)) {
        const api = new Api();

        api.remessafinanceira
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
    this.path = PATHS.RemessaFinanceira;
    this.rotas.edicao.remessaFinanceira = this.getRouteEdicao(
      this.getModule(),
      this.path
    );
    this.rotas.edicao.atendimento = this.getRouteEdicao(
      this.getModule(),
      PATHS.Atendimento
    );
    this.rotas.edicao.banco = this.getRouteEdicao(this.getModule(), PATHS.Banco);
    this.rotas.edicao.cnab = this.getRouteEdicao(this.getModule(), PATHS.Cnab);
  },
});
</script>
