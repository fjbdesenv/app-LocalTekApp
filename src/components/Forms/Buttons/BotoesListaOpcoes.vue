<template>
  <router-link
    :to="{
      name: rotaConsultar,
      params: { codigo },
    }"
  >
    <b-button variant="success" class="mx-2">
      <BIconClipboardPlus />
    </b-button>
  </router-link>

  <router-link
    :to="{
      name: rotaEditar,
      params: { codigo },
    }"
  >
    <b-button variant="primary" class="mx-2">
      <BIconBrushFill />
    </b-button>
  </router-link>

  <b-button variant="danger" class="mx-2" @click="deletar()">
    <BIconTrashFill />
  </b-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BIconBrushFill, BIconTrashFill, BIconClipboardPlus } from "bootstrap-icons-vue";
import { BButton } from "bootstrap-vue-next";

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
    rotaConsultar: {
      type: String,
      requered: true,
    },
  },
  components: {
    BIconBrushFill,
    BIconTrashFill,
    BIconClipboardPlus,
    BButton,
  },
  emits: ["deletarRegistro"],
  methods: {
    deletar() {
      this.$emit("deletarRegistro");
    },
  },
});
</script>
