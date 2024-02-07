<template>
  <table class="table table-hover">
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
        <td>{{ tipo(registro.tipo) }}</td>
        <td class="d-flex justify-content-center">
          <router-link
            :to="{ name: 'StatusEditar', params: { codigo: registro.codigo } }"
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
import { mixinRegisters } from "@/mixins";

export default defineComponent({
  name: "ListaComponente",
  components: {
    BIconClipboard2Check,
    BIconTrashFill,
  },
  methods: {
    tipo(tipo: number | undefined): string {
      if (tipo) {
        switch (tipo) {
          case 1:
            return "Padrão";
          case 2:
            return "Remessa";
          case 3:
            return "Especificidade";
        }
      }
      return "";
    },
  },
  mixins: [mixinRegisters],
});
</script>
