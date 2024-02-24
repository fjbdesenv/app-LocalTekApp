<template>
  <router-link
    :to="{
      name: propsRotaEditar,
      params: { codigo: propsCodigo },
    }"
  >
    <b-button :id="`btn-editar-${propsCodigo}`" variant="primary" class="mx-2">
      <BIconClipboardPlus />
    </b-button>
  </router-link>
  <b-tooltip :target="`btn-editar-${propsCodigo}`" triggers="focus" placement="bottom">
    Consultar
  </b-tooltip>

  <b-button
    :id="`btn-deletar-${propsCodigo}`"
    variant="danger"
    class="mx-2"
    @click="deletar()"
  >
    <BIconTrashFill />
  </b-button>
  <b-tooltip :target="`btn-deletar-${propsCodigo}`" triggers="focus" placement="bottom">
    Deletar
  </b-tooltip>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BIconClipboardPlus, BIconTrashFill } from "bootstrap-icons-vue";
import { BButton, BTooltip } from "bootstrap-vue-next";

export default defineComponent({
  name: "BotoesListaOpcoes",
  props: {
    propsCodigo: {
      type: Number,
      default: 0,
    },
    propsRotaEditar: {
      type: String,
      required: true,
    },
  },
  components: {
    BIconClipboardPlus,
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
