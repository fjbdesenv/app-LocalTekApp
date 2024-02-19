<template>
  <router-link
    :to="{
      name: rotaEditar,
      params: { codigo },
    }"
  >
    <b-button :id="`btn-editar-${codigo}`" variant="primary" class="mx-2">
      <BIconBrushFill />
    </b-button>
  </router-link>
  <b-tooltip :target="`btn-editar-${codigo}`" triggers="focus" placement="bottom">
    Editar
  </b-tooltip>

  <b-button
    :id="`btn-deletar-${codigo}`"
    variant="danger"
    class="mx-2"
    @click="deletar()"
  >
    <BIconTrashFill />
  </b-button>
  <b-tooltip :target="`btn-deletar-${codigo}`" triggers="focus" placement="bottom">
    Deletar
  </b-tooltip>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BIconBrushFill, BIconTrashFill } from "bootstrap-icons-vue";
import { BButton, BTooltip } from "bootstrap-vue-next";

export default defineComponent({
  name: "BotoesListaOpcoes",
  props: {
    codigo: {
      type: Number,
      reqiered: true,
    },
    rotaEditar: {
      type: String,
      requered: true,
    },
  },
  components: {
    BIconBrushFill,
    BIconTrashFill,
    BButton,
    BTooltip,
  },
  emits: ["deletarRegistro"],
  methods: {
    deletar() {
      this.$emit("deletarRegistro");
    },
  },
});
</script>
