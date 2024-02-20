<template>
  <FormAtendimento :props-cadastro="true" :props-disabled="false" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormAtendimento from "@/components/Forms/FormAtendimento.vue";

export default defineComponent({
  name: "AtendimentoCadastro",
  components: {
    FormAtendimento,
  },
});
</script>
