<template>
  <table class="table table-hover mt-3">
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
              name: rotas.atendimentoEditar,
              params: { codigo: registro.codigo_atendimento },
            }"
          >
            {{ registro.atendimento?.codigo_atendimento_tek }}
          </router-link>
        </td>

        <td>
          <router-link
            :to="{
              name: rotas.bancoEditar,
              params: { codigo: registro.codigo_banco },
            }"
          >
            {{ registro.banco?.nome }}
          </router-link>
        </td>

        <td>
          <router-link
            :to="{
              name: rotas.cnabEditar,
              params: { codigo: registro.codigo_cnab },
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

        <td>
          <router-link
            :to="{
              name: rotas.statusEditar,
              params: { codigo: registro.codigo_status },
            }"
            >{{ registro.status?.descricao }}</router-link
          >
        </td>

        <td class="d-flex justify-content-center">
          <BotoesListaOpcoes
            @deletarRegistro="deletar(registro.codigo ? registro.codigo : 0)"
            :codigo="registro.codigo"
            :rota-editar="rotas.remessaFinanceiraEditar"
            :rota-consultar="rotas.remessaFinanceiraConcultar"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { MixinConfirmacaoDeletar } from "@/mixins";
import { Api, RemessaFinanceira } from "@/class";
import BotoesListaOpcoes from "@/components/Forms/Buttons/BotoesListaOpcoes.vue";

export default defineComponent({
  name: "ListaRemessaFinanceiraComponente",
  data: () => ({
    registros: new Array<RemessaFinanceira>(),
    rotas: {
      cnabEditar: "RemessaCnabEditar",
      bancoEditar: "RemessaBancoEditar",
      statusEditar: "RemessaStatusEditar",
      atendimentoEditar: "RemessaAtendimentoEditar",
      remessaFinanceiraEditar: "RemessaRemessaFinanceiraEditar",
      remessaFinanceiraConcultar: "RemessaRemessaFinanceiraConsultar",
    },
  }),
  components: {
    BotoesListaOpcoes,
  },
  mixins: [MixinConfirmacaoDeletar],
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
  },
});
</script>
