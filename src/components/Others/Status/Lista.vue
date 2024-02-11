<template>
  <table class="table table-hover mt-3">
    <thead>
      <tr>
        <th>Código</th>
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
          <router-link
            :to="{ name: rotas.statusEditar, params: { codigo: registro.codigo } }"
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
import { MixinMapStatusTipo, MixinConfirmacaoDeletar } from "@/mixins";
import { Api, Cnab, Status } from "@/class";

export default defineComponent({
  name: "ListaComponente",
  data: () => ({
    registros: new Array<Status>(),
    rotas: {
      statusEditar: "RemessaStatusEditar",
    },
  }),
  components: {
    BIconClipboard2Check,
    BIconTrashFill,
  },
  mixins: [MixinMapStatusTipo, MixinConfirmacaoDeletar],
  methods: {
    getRegitros() {
      const api = new Api();

      while (this.registros.length > 0) this.registros.pop();

      api.status
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

        api.status
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
