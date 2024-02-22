<template>
  <FormAtendimentoEvento :props-cadastro="false" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormAtendimentoEvento from "@/components/Forms/FormAtendimentoEvento.vue";

export default defineComponent({
  name: "AtendimentoEditar",
  components: {
    FormAtendimentoEvento,
  },
});
</script>
