<template>
  <router-link
    :to="{
      name: propsRotaEvento,
      params: { codigoAtendimento: propscodigoAtendimento },
    }"
  >
    <b-button
      :id="`btn-eventos-${propscodigoAtendimento}`"
      variant="outline-secondary"
      class="mx-2 bg-secondary-subtle"
    >
      <BIconCalendarEvent />
    </b-button>
  </router-link>
  <b-tooltip
    :target="`btn-eventos-${propscodigoAtendimento}`"
    triggers="focus"
    placement="bottom"
  >
    Eventos
  </b-tooltip>

  <router-link
    :to="{
      name: propsRotaArquivo,
      params: { codigoAtendimento: propscodigoAtendimento },
    }"
  >
    <b-button
      :id="`btn-arquivos-${propscodigoAtendimento}`"
      variant="outline-secondary"
      class="mx-2 bg-secondary-subtle"
    >
      <BIconFiles />
    </b-button>
  </router-link>
  <b-tooltip
    :target="`btn-arquivos-${propscodigoAtendimento}`"
    triggers="focus"
    placement="bottom"
  >
    Arquivos
  </b-tooltip>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BIconFiles, BIconCalendarEvent } from "bootstrap-icons-vue";
import { BButton, BTooltip } from "bootstrap-vue-next";

export default defineComponent({
  name: "BotoesListaAtendimento",
  props: {
    propscodigoAtendimento: {
      type: Number,
      required: true,
    },
    propsRotaArquivo: {
      type: String,
      required: true,
    },
    propsRotaEvento: {
      type: String,
      required: true,
    },
  },
  components: {
    BIconFiles,
    BIconCalendarEvent,
    BButton,
    BTooltip,
  },
});
</script>

<style scoped>
.btn:hover {
  color: blue;
  background: #aaa !important;
}
</style>
