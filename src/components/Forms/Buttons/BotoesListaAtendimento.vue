<template>
  <router-link
    :to="{
      name: propsRotaEvento,
      params: { codigoAtendimento: propscodigoAtendimento },
    }"
  >
    <b-button
      :id="`btn-eventos-${propscodigoAtendimento}`"
      variant="outline-info"
      class="mx-2"
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

  <!-- <router-link
    :to="{
      name: propsRotaArquivos,
      params: { codigo: propsCodigo },
    }"
  >
    <b-button :id="`btn-arquivos-${propsCodigo}`" variant="outline-info" class="mx-2">
      <BIconFiles />
    </b-button>
  </router-link>
  <b-tooltip :target="`btn-arquivos-${propsCodigo}`" triggers="focus" placement="bottom">
    Arquivos
  </b-tooltip> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { /*BIconFiles,*/ BIconCalendarEvent } from "bootstrap-icons-vue";
import { BButton, BTooltip } from "bootstrap-vue-next";

export default defineComponent({
  name: "BotoesListaAtendimento",
  props: {
    propscodigoAtendimento: {
      type: Number,
      reqiered: true,
    },
    propsRotaArquivo: {
      type: String,
      requered: true,
    },
    propsRotaEvento: {
      type: String,
      requered: true,
    },
  },
  components: {
    //BIconFiles,
    BIconCalendarEvent,
    BButton,
    BTooltip,
  },
});
</script>
