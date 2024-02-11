<template>
  <b-button class="m-3" type="submit" variant="success">
    <BIconCheck2Circle class="mx-1" /> Gravar
  </b-button>

  <router-link :to="{ name: routerName }">
    <b-button class="m-3" type="button" variant="danger">
      <BIconXCircle class="mx-1" /> Voltar</b-button
    >
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BIconCheck2Circle, BIconXCircle } from "bootstrap-icons-vue";
import { BButton } from "bootstrap-vue-next";

export default defineComponent({
  name: "BotoesForm",
  components: {
    BIconCheck2Circle,
    BIconXCircle,
    BButton,
  },
  props: {
    routerName: {
      type: String,
      required: true,
    },
  },
});
</script>
