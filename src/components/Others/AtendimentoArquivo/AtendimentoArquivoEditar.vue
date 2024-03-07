<template>
  <FormAtendimentoArquivo :props-cadastro="false" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormAtendimentoArquivo from "@/components/Forms/FormAtendimentoArquivo.vue";

export default defineComponent({
  name: "AtendimentoArquivoEditar",
  components: {
    FormAtendimentoArquivo,
  },
});
</script>
