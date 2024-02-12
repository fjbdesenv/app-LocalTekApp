<template>
  <table class="table table-hover mt-3">
    <thead>
      <tr>
        <th>Código</th>
        <th>Nome</th>
        <th>Banco Código</th>
        <th>Banco Camara</th>
        <th>Status</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(registro, index) in registros" :key="index">
        <td>{{ registro.codigo }}</td>
        <td>{{ registro.nome }}</td>
        <td>{{ registro.codigo_banco }}</td>
        <td>{{ registro.codigo_camara }}</td>
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
            :to="{ name: rotas.bancoEditar, params: { codigo: registro.codigo } }"
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
import { Api, Banco } from "@/class";

export default defineComponent({
  name: "ListaBancoComponente",
  data: () => ({
    registros: new Array<Banco>(),
    rotas: {
      statusEditar: "RemessaStatusEditar",
      bancoEditar: "RemessaBancoEditar",
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

      api.banco
        .findAll()
        .then((response) => {
          const aux: Array<Banco> = response.data;
          aux.forEach((item: Banco) => this.registros.push(item));
        })
        .catch((error: ErrorEvent) => {
          this.$emit("erro", error);
          console.error(error.message);
        });
    },

    deletar(codigo: number) {
      if (this.confimacaoDeletar(codigo)) {
        const api = new Api();

        api.banco
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
