<template>
  <FormRemessaFinanceira :cadastro="true" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormRemessaFinanceira from "@/components/Forms/FormRemessaFinanceira.vue";

export default defineComponent({
  name: "RemessaFinanceiraCadastro",
  components: {
    FormRemessaFinanceira,
  },
});
</script>
