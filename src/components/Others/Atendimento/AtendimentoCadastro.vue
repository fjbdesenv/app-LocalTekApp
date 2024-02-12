<template>
  <FormAtendimento :cadastro="true" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormAtendimento from "@/components/Forms/FormAtendimento.vue";

export default defineComponent({
  name: "StatusCadastro",
  components: {
    FormAtendimento,
  },
});
</script>
