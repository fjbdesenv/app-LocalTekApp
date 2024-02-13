<template>
  <table class="table table-hover mt-3">
    <thead>
      <tr>
        <th>#</th>
        <th>Cód. Tek-System</th>
        <th>Razão Social</th>
        <th>Status</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(registro, index) in registros" :key="index">
        <td>{{ registro.codigo }}</td>
        <td>{{ registro.codigo_cliente_tek }}</td>
        <td>{{ registro.razao }}</td>
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
            :to="{ name: rotas.clienteEditar, params: { codigo: registro.codigo } }"
          >
            <button class="btn btn-primary mx-2"><BIconBrushFill /></button>
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
import { BIconBrushFill, BIconTrashFill } from "bootstrap-icons-vue";
import { MixinConfirmacaoDeletar } from "@/mixins";
import { Api, Cliente } from "@/class";

export default defineComponent({
  name: "ListaClienteComponente",
  data: () => ({
    registros: new Array<Cliente>(),
    rotas: {
      statusEditar: "RemessaStatusEditar",
      clienteEditar: "RemessaClienteEditar",
    },
  }),
  components: {
    BIconBrushFill,
    BIconTrashFill,
  },
  mixins: [MixinConfirmacaoDeletar],
  methods: {
    getRegitros() {
      const api = new Api();

      while (this.registros.length > 0) this.registros.pop();

      api.cliente
        .findAll()
        .then((response) => {
          const aux: Array<Cliente> = response.data;
          aux.forEach((item: Cliente) => this.registros.push(item));
        })
        .catch((error: ErrorEvent) => {
          this.$emit("erro", error);
          console.error(error.message);
        });
    },

    deletar(codigo: number) {
      if (this.confimacaoDeletar(codigo)) {
        const api = new Api();

        api.cliente
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
