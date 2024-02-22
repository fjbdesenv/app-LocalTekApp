<template>
  <FormAtendimentoEvento :props-cadastro="true" :props-disabled="false" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormAtendimentoEvento from "@/components/Forms/FormAtendimentoEvento.vue";

export default defineComponent({
  name: "AtendimentoCadastro",
  components: {
    FormAtendimentoEvento,
  },
});
</script>
