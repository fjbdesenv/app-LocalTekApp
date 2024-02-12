<template>
  <table class="table table-hover mt-3">
    <thead>
      <tr>
        <th>Código</th>
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
              name: rotas.clienteEditar,
              params: { codigo: registro.codigo_status },
            }"
            >{{ registro.cliente?.razao }}</router-link
          >
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
          <router-link
            :to="{ name: rotas.atendimentoEditar, params: { codigo: registro.codigo } }"
          >
            <button class="btn btn-primary mx-2"><BIconClipboard2Check /></button>
          </router-link>
          <button
            class="btn btn-danger mx-2"
            @click="() => deletar(registro.codigo ? registro.codigo : 0)"
          >
            <BIconTrashFill />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BIconClipboard2Check, BIconTrashFill } from "bootstrap-icons-vue";
import { MixinConfirmacaoDeletar } from "@/mixins";
import { Api, Atendimento } from "@/class";

export default defineComponent({
  name: "ListaAtendimentoComponente",
  data: () => ({
    registros: new Array<Atendimento>(),
    rotas: {
      statusEditar: "RemessaStatusEditar",
      clienteEditar: "RemessaClienteEditar",
      atendimentoEditar: "RemessaAtendimentoEditar",
    },
  }),
  components: {
    BIconClipboard2Check,
    BIconTrashFill,
  },
  mixins: [MixinConfirmacaoDeletar],
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
  },
});
</script>
