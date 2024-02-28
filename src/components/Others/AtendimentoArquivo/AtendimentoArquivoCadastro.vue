<template>
  <FormAtendimentoArquivo :props-cadastro="true" :props-disabled="false" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormAtendimentoArquivo from "@/components/Forms/FormAtendimentoArquivo.vue";

export default defineComponent({
  name: "AtendimentoArquivoCadastro",
  components: {
    FormAtendimentoArquivo,
  },
});
</script>
