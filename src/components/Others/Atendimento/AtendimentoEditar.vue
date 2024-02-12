<template>
  <FormAtendimento :cadastro="false" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormAtendimento from "@/components/Forms/FormAtendimento.vue";

export default defineComponent({
  name: "AtendimentoEditar",
  components: {
    FormAtendimento,
  },
});
</script>
